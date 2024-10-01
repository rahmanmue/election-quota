import { Modal } from "@/components/Modal";
import { SelectDemo } from "@/components/Select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { isEmptyObject } from "@/lib/commonUtils";
import { UserType } from "@/services/userService";
import { useEffect, useState } from "react";

interface ActionModalProps {
  title: string;
  icon: React.ReactNode;
  submitForm: (data: UserType, resetState?: () => void) => void;
  initialData: UserType;
}

const select = [
  {
    item: "Admin",
    value: "admin",
  },
  {
    item: "User",
    value: "user",
  },
];

export const ActionModal = ({
  title,
  icon,
  initialData,
  submitForm,
}: ActionModalProps) => {
  const { toast } = useToast();
  const [data, setData] = useState<UserType>({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setData((prevData) => ({
      ...prevData,
      role: value,
    }));
  };

  const handleSubmit = () => {
    if (!isEmptyObject(data)) {
      // alert(JSON.stringify(data));
      submitForm(data);
      return;
    }

    toast({
      title: "Uh oh! Empty Data.",
      description: "There was a Empty Data with your request!.",
      variant: "destructive",
    });
    setData(initialData);
    return;
  };

  return (
    <Modal title={title} icon={icon} submitForm={handleSubmit}>
      <div className="py-4 flex flex-col gap-4">
        <Input
          type="text"
          className="col-span-2"
          name="name"
          value={data.name}
          tabIndex={-1}
          onChange={handleOnChange}
        />
        <Input
          type="email"
          className="col-span-2"
          name="email"
          tabIndex={-1}
          value={data?.email}
          onChange={handleOnChange}
        />
        <SelectDemo
          placeholder="Role"
          select={select}
          onChange={handleSelectChange}
        />
      </div>
    </Modal>
  );
};
