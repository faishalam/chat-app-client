import HomeLayout from "@/components/pageComponents/HomComponents/HomeLayouts";
import { HomeProviders } from "@/providers/rootProviders/HomeProviders";

export default function Page() {
  return (
    <>
      <HomeProviders>
        <HomeLayout />
      </HomeProviders>
    </>
  );
}
