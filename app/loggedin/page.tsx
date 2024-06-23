import GoogleMeetComponent from "@/components/google-meet-component";
import UserProfile from "@/components/user-profile";

const LoggedInPage = () => {
  return (
    <div className=" h-full w-full">
      <UserProfile />
      <GoogleMeetComponent />
    </div>
  );
};

export default LoggedInPage;
