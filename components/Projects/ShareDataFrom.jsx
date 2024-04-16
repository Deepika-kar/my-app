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

export function ShareDetailsForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Share />
          Share Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] m-1">
        <DialogHeader>
          <DialogTitle>Share Details</DialogTitle>
          <DialogDescription>
            Share your details and contribute to the research
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="description" className="text-right">
              Details
            </Label>
            <Textarea
              placeholder="Detailed description of your medical condition and diagnosis"
              id="description"
              className="col-span-3"
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="gender" className="text-right">
              Gender
            </Label>
            <Select id="gender" onValueChange={(value) => console.log(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Gender</SelectLabel>
                  <SelectItem value="M">Male</SelectItem>
                  <SelectItem value="F">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="age" className="text-right">
              Age
            </Label>
            <Input
              placeholder="Enter your age"
              id="age"
              className="col-span-3"
              type="number"
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="file" className="text-right">
              Files
            </Label>
            <Input
              placeholder="Share your records"
              id="file"
              className="col-span-3"
              type="file"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
