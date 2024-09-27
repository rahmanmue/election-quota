import { Layout } from "@/components/admin-panel/Layout";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Profile = () => {
  return (
    <Layout title="Profile">
      <Avatar className="h-36 w-36 mx-auto mb-5">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      </Avatar>
      <div className="flex flex-col gap-4">
        <Input type="file" />
        <Input type="text" placeholder="name" />
        <Button>Simpan Perubahan Profile</Button>
      </div>
      <div className="flex flex-col gap-4 mt-5">
        <Input type="text" placeholder="username" />
        <Input type="email" placeholder="email" />
        <Input type="confirm_password" placeholder="confirm password" />
        <Input type="password" placeholder="password" />
        <Button>Simpan Perubahan Akun</Button>
      </div>
    </Layout>
  );
};

export default Profile;
