import { useApp } from "../../../context/AppContext";
import Layout from "../../Layout";
import Card from "../../ui/Card";
import Input from "../../ui/Input";

export default function Profile() {
  const { user } = useApp();

  return (
    <Layout title="My profile">
      <Card className="max-w-lg p-6">
        <div className="space-y-3.5">
          <Input label="Full name" value={user?.name || ""} disabled />
          <Input label="Student ID" value={user?.id || ""} disabled />
          <Input label="Hall / Block" value="Sadhinota Hall · Block A" disabled />
        </div>
      </Card>
    </Layout>
  );
}