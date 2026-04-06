import { cn, getId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/store/auth";
import type { User } from "../../type";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const setUser = useAuth((state) => state.setUser);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Admin account</CardTitle>
          <CardDescription>
            Enter your email below to login to your admin account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              const formDate = new FormData(ev.currentTarget);
              const username = formDate.get("username");
              const password = formDate.get("password");
              const id = getId();

              const user = {
                id,
                username,
                password,
                type: "admin",
              } as User;
              localStorage.setItem("user", JSON.stringify(user));
              setUser(user);
            }}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="John Doe"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input name="password" id="password" type="password" required />
              </Field>

              <Field>
                <Button type="submit">Login</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
