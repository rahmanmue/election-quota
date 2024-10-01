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
import { FormEvent, ReactEventHandler, useState } from "react";
import PasswordService from "@/services/passwordService";
import { useToast } from "@/hooks/use-toast";

const passwordService = new PasswordService();

interface ModalProps {
  title: string;
  submitForm?: () => void;
  children: React.ReactNode;
}

export const ForgetPasswordModal = ({ title, children }: ModalProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const [iEmail, setIEmail] = useState<string>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { message } = await passwordService.forgetPassword(
        iEmail as string
      );
      toast({
        title: "Success send Link",
        description: `${message}`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `${error.message}`,
        description: "Something went wrong, please try again..",
      });
    }

    setOpen(!open);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Masukan Email"
              onChange={(e) => setIEmail(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Send Link</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
