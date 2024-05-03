import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share } from "lucide-react";
import { Textarea } from "../ui/textarea";
import CryptoJS from "crypto-js";
import { useFormik } from "formik";
import { useState } from "react";
const KEY = "0x12E748401285fdbaBdA477894973d2BAF2050C65";
export function ShareDetailsForm() {
  const [data, setData] = useState("");
  function encrypt(objectToEncrypt) {
    const jsonString = JSON.stringify(objectToEncrypt);
    const encrypted = CryptoJS.AES.encrypt(jsonString, KEY).toString();
    return encrypted;
  }

  const formik = useFormik({
    initialValues: {
      details: "",
    },
    onSubmit: (values) => {
      setData(encrypt(values));
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Share />
          Share Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] m-1">
        {!data ? (
          <>
            <DialogHeader>
              <DialogTitle>Share Details</DialogTitle>
              <DialogDescription>
                Share your details and contribute to the research
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  placeholder="Detailed description of your medical condition and diagnosis"
                  id="description"
                  className="col-span-3"
                  value={formik.values.details}
                  onChange={(e) =>
                    formik.setFieldValue("details", e.target.value)
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={formik.handleSubmit}>Submit</Button>
            </DialogFooter>
          </>
        ) : (
          <Input className="col-span-3" type="textarea" value={data} />
        )}
      </DialogContent>
    </Dialog>
  );
}
