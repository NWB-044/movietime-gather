import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AdminLoginProps {
  onLogin: (nickname: string) => void;
}

interface FormData {
  nickname: string;
  passcode: string;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { toast } = useToast();

  const onSubmit = (data: FormData) => {
    console.log("Admin login attempt:", { nickname: data.nickname });
    
    if (data.nickname === "Bipho" && data.passcode === "1732010") {
      onLogin(data.nickname);
      toast({
        title: "Welcome back, Admin!",
        description: "You've successfully logged in.",
      });
    } else {
      toast({
        title: "Authentication Failed",
        description: "Invalid nickname or passcode.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm mx-auto">
      <div className="space-y-2">
        <Input
          {...register("nickname", { required: "Nickname is required" })}
          placeholder="Admin Nickname"
          className="w-full"
        />
        {errors.nickname && (
          <p className="text-sm text-destructive">{errors.nickname.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Input
          {...register("passcode", { required: "Passcode is required" })}
          type="password"
          placeholder="Admin Passcode"
          className="w-full"
        />
        {errors.passcode && (
          <p className="text-sm text-destructive">{errors.passcode.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Login as Admin
      </Button>
    </form>
  );
};