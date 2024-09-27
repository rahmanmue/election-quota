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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ModalProps {
  title: string;
  submitForm: () => void;
  children: React.ReactNode;
}

export const ForgetPasswordModal = ({
  title,
  submitForm,
  children,
}: ModalProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = () => {
    submitForm();
    setOpen(!open);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Masukan Email" />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Send Link</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
