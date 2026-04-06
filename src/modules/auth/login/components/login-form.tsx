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
// import { useAuth } from "@/store/auth";
import type { User } from "../../type";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // const setUser = useAuth((state) => state.setUser);
  const [form, setForm] = useState({ username: "", password: "" });

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

              const id = getId();

              const user = {
                id,
                username: form.username,
                password: form.password,
                type: "admin",
              } as User;
              localStorage.setItem("user", JSON.stringify(user));
              window.location.reload();
            }}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  value={form.username}
                  placeholder="John Doe"
                  onChange={(ev) => {
                    setForm((prev) => {
                      return { ...prev, username: ev.target.value };
                    });
                  }}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  onChange={(ev) => {
                    setForm((prev) => {
                      return { ...prev, password: ev.target.value };
                    });
                  }}
                  value={form.password}
                  name="password"
                  id="password"
                  type="password"
                  required
                />
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
