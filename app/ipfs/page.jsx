"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import CryptoJS from "crypto-js";
import { Button } from "@/components/ui/button";
const KEY = "0x12E748401285fdbaBdA477894973d2BAF2050C65";

const Ipfs = () => {
  const [hash, setHash] = useState("");
  const [decryptedObject, setDecryptedObject] = useState(null);
  function decrypt(encryptedData) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, KEY);
    const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const decryptedObject = JSON.parse(decryptedString);
    return decryptedObject;
  }
  const handleDecrypt = () => {
    const decryptedObject = decrypt(hash);
    setDecryptedObject(decryptedObject);
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card className="h-80 w-80">
        <CardHeader>
          <CardTitle>IPFS Decrypt</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="hash"
            onChange={(e) => setHash(e.target.value)}
          />
          <Button onClick={handleDecrypt}>Decrypt</Button>
          {decryptedObject &&
            Object.keys(decryptedObject).map((key) => (
              <div key={key}>
                {key} : {decryptedObject[key]}
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Ipfs;
