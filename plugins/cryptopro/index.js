/* eslint-disable no-undef, no-console */
// noinspection JSUnresolvedVariable,JSUnresolvedFunction

import moment from 'moment'

const CADESCOM_CADES_BES = 1
const CADESCOM_BASE64_TO_BINARY = 1

class Certificate {
  constructor(data, subjectName, serialNumber, title) {
    this.data = data
    this.subjectName = subjectName
    this.serialNumber = serialNumber
    this.title = title
  }
}

const checkSupportFileReaderInBrowser = async () => {
  if (!window.FileReader) {
    throw new Error('Браузер не поддерживает File API.')
  }
  await cadesplugin
}

export const fetchCertificates = async () => {
  await checkSupportFileReaderInBrowser()

  try {
    const oStore = await cadesplugin.CreateObjectAsync('CAdESCOM.Store')
    await oStore.Open(
      cadesplugin.CADESCOM_CONTAINER_STORE,
      cadesplugin.CAPICOM_MY_STORE,
      cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED
    )
    const results = []

    const certificates = await oStore.Certificates
    const certificateLength = await certificates.Count
    for (let i = 1; i <= certificateLength; i++) {
      await certificates.Item(i).then(async (cert) => {
        const isValid = await (await cert.IsValid()).Result
        if (!isValid) return

        let validToDate = await cert.ValidToDate
        if (validToDate) {
          validToDate =
            'Действителен до: ' + moment(validToDate).format('DD.MM.YY')
        }

        const certificate = new Certificate(
          cert,
          await cert.SubjectName,
          await cert.SerialNumber,
          [
            await cert.GetInfo(0),
            await cert.GetInfo(2),
            await cert.GetInfo(4),
            validToDate,
          ]
            .filter((i) => !!i)
            .join('; ')
        )
        results.push(certificate)
      })
    }
    await oStore.Close()

    return results
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    throw new Error(
      'Не удалось получить сертификаты. Убедитесь, что у вас верно настроен Crypto Pro'
    )
  }
}

export const signDataBase64 = async (certificate, dataBase64) => {
  await checkSupportFileReaderInBrowser()

  let signedMessage, sBase64Data

  try {
    const header = ';base64,'
    sBase64Data = dataBase64.substr(dataBase64.indexOf(header) + header.length)

    const oSigner = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner')
    await oSigner.propset_Certificate(certificate)
    await oSigner.propset_CheckCertificate(true)

    const oSignedData = await cadesplugin.CreateObjectAsync(
      'CAdESCOM.CadesSignedData'
    )
    await oSignedData.propset_ContentEncoding(CADESCOM_BASE64_TO_BINARY)
    await oSignedData.propset_Content(sBase64Data)

    signedMessage = await oSignedData.SignCades(
      oSigner,
      CADESCOM_CADES_BES,
      true
    )
  } catch (e) {
    console.error(e)
    throw new Error(
      'Не удалось создать подпись. Ошибка: ' + cadesplugin.getLastError(e)
    )
  }

  try {
    const oSignedData2 = await cadesplugin.CreateObjectAsync(
      'CAdESCOM.CadesSignedData'
    )

    await oSignedData2.propset_ContentEncoding(CADESCOM_BASE64_TO_BINARY)
    await oSignedData2.propset_Content(sBase64Data)
    await oSignedData2.VerifyCades(signedMessage, CADESCOM_CADES_BES, true)

    return signedMessage
  } catch (e) {
    console.error(e)
    throw new Error(
      'Не удалось проверить подпись. Ошибка: ' + cadesplugin.getLastError(e)
    )
  }
}
