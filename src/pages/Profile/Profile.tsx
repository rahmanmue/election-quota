import { Layout } from "@/components/admin-panel/Layout";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ProfileService, { ProfileType } from "@/services/profileService";
import UserService, { UserType } from "@/services/userService";
import { useEffect, useState } from "react";

const profileService = new ProfileService();
const userService = new UserService();

const Profile = () => {
  const [dProfile, setDProfile] = useState<ProfileType>();
  const [dUser, setDUser] = useState<UserType>();
  const [file, setFile] = useState<File | null>(null);

  const getProfile = async () => {
    const { data } = await profileService.getProfile();
    setDProfile(data);
  };

  const getUser = async () => {
    const { data } = await userService.getByRToken();
    setDUser(data);
  };

  useEffect(() => {
    getProfile();
    // console.log(dProfile);

    getUser();
    // console.log(dUser);
  }, []);

  const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDUser((prev: any) => ({ ...prev, [name]: value }));
  };

  const submitProfile = async () => {
    if (dProfile?.full_name == "") {
      console.error("There is Empty Input Profile");
      return;
    }

    if (!file) {
      const dPost = new FormData();
      dPost.append("userId", dProfile?.user_id as string);
      dPost.append("full_name", dProfile?.full_name as string);

      await profileService.updateProfile(dPost);
    } else {
      const dPost = new FormData();
      dPost.append("userId", dProfile?.user_id as string);
      dPost.append("full_name", dProfile?.full_name as string);
      dPost.append("avatar", file);

      await profileService.updateProfile(dPost);
    }

    getProfile();
  };

  const submitUser = async () => {
    if (dUser?.email == "" || dUser?.name == "") {
      console.error("email or name is empty");
      return;
    }

    if (dUser?.password != dUser?.conf_password) {
      console.error("password & conf_password doesnt match");
      return;
    }

    const data =
      dUser?.password == ""
        ? {
            id: dUser.id,
            name: dUser.name,
            email: dUser.email,
          }
        : {
            id: dUser?.id,
            name: dUser?.name,
            email: dUser?.email,
            password: dUser?.password,
          };

    // alert(JSON.stringify(xy));
    await userService.updateUser(data as UserType);
    getUser();
  };

  return (
    <Layout title="Profile">
      <Avatar className="h-36 w-36 mx-auto mb-5">
        <AvatarImage
          src={
            dProfile?.avatar
              ? profileService.getAvatar(dProfile.avatar as string)
              : "https://github.com/shadcn.png"
          }
          alt="@shadcn"
        />
      </Avatar>
      <div className="flex flex-col gap-4">
        <Input
          type="file"
          accept="image/png,image/jpg,image/jpeg"
          onChange={(e: any) => setFile(e.target.files?.[0] || null)}
        />
        <Input
          type="text"
          placeholder="name"
          name="full_name"
          value={dProfile?.full_name}
          onChange={handleChangeProfile}
        />
        <Button onClick={submitProfile}>Simpan Perubahan Profile</Button>
      </div>
      <div className="flex flex-col gap-4 mt-5">
        <Input
          type="role"
          className="uppercase"
          placeholder="role"
          disabled={true}
          name="role"
          value={dUser?.role}
          onChange={handleChangeUser}
        />
        <Input
          type="text"
          placeholder="Username"
          name="name"
          value={dUser?.name}
          onChange={handleChangeUser}
        />
        <Input
          type="email"
          placeholder="email"
          name="email"
          value={dUser?.email}
          onChange={handleChangeUser}
        />

        <Input
          type="password"
          placeholder="confirm password"
          name="conf_password"
          onChange={handleChangeUser}
        />
        <Input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChangeUser}
        />
        <Button onClick={submitUser}>Simpan Perubahan Akun</Button>
      </div>
    </Layout>
  );
};

export default Profile;
