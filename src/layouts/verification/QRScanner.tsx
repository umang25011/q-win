import React, { useState, useCallback, useEffect } from "react"
import { useAppDispatch } from "../../store/store"
// @ts-ignore
import QrReader from "react-qr-scanner"
import { uploadVerificationToEvent } from "./qrScannerSlice"
import { decryptJson, encryptJson } from "../../config/helper"

export default function QrScanner() {
  const [result, setResult] = useState("")
  const dispatch = useAppDispatch()

  const test = async () => {
    // Generate a random 256-bit AES encryption key
    const key = await crypto.subtle.generateKey(
      { name: "AES-CBC", length: 256 },
      true, // exportable
      ["encrypt", "decrypt"]
    )

    // Example JSON object to encrypt
    const plainJson = { foo: "bar", baz: 123 }

    // Encrypt the JSON object
    const encryptedJson = await encryptJson(plainJson, key)

    console.log("Encrypted JSON:", encryptedJson)
      console.log("Key:", key);
      
    // Decrypt the encrypted JSON object
    const decryptedJson = await decryptJson(encryptedJson, key)

    console.log("Decrypted JSON:", decryptedJson)
  }

  useEffect(() => {
    test()
  }, [])

  const handleScan = (data: any) => {
    if (data) {
      // eventID, hash
      const parsedData = JSON.parse(data)
      dispatch(uploadVerificationToEvent(parsedData.hash, parsedData.eventID))
    }
  }

  return (
    <div>
      <QrReader onScan={handleScan} facingMode="rear" />
      <p>{result}</p>
    </div>
  )
}
