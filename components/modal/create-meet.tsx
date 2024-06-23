"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import TimePickerComponent from "./time-picker";
import { Button } from "../ui/button";
import MultiCreatableSelect from "../multi-createable-select";
import { useState } from "react";
import { createMeet } from "@/actions/meet";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const formSchema = z.object({
  summary: z.string().min(1, "Summary is required"),
  description: z.string().optional(),
  start: z.object({
    dateTime: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), "Invalid dateTime format"),
    timeZone: z.string(),
  }),
  end: z.object({
    dateTime: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), "Invalid dateTime format"),
    timeZone: z.string(),
  }),
  attendees: z
    .array(
      z.object({
        email: z.string().email("Invalid email format"),
      })
    )
    .optional(),
});

type formSchemaType = z.infer<typeof formSchema>;

type Props = {
  children: React.ReactNode;
};

const currentDate = new Date();

const CreateMeetDialog = ({ children }: Props) => {
  const user = useSession();

  const [loading, setLoading] = useState(false);
  const [attendees, setAttendees] = useState<any[]>([]);

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      start: {
        dateTime: new Date().toISOString(),
        timeZone: "UTC",
      },
      end: {
        dateTime: new Date(
          currentDate.getTime() + 1 * 60 * 60 * 1000
        ).toISOString(),
        timeZone: "UTC",
      },
    },
  });

  const onSubmit = (values: formSchemaType) => {
    setLoading(true);
    createMeet({
      email: user.data?.user?.email,
      ...values,
    })
      .then((meet) => toast.success(meet?.data.hangoutLink))
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl lg:h-4/6 flex flex-col">
        <DialogHeader className="w-full">
          <DialogTitle>Create new Meet</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="p-2 flex flex-col gap-5 justify-between overflow-auto"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className=" grid grid-cols-2 gap-5">
              <div className=" flex flex-col gap-5">
                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Add Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the title..." {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display title.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter the description of the meet..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <TimePickerComponent form={form} />
            </div>

            <FormField
              control={form.control}
              name="attendees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attendees</FormLabel>
                  <FormControl>
                    <MultiCreatableSelect
                      prefix="add attendees to the meet"
                      options={[]}
                      onChange={(e: any) => {
                        setAttendees(e.map((item: any) => item.label));
                        form.setValue(
                          "attendees",
                          e.map((item: any) => ({ email: item.value }))
                        );
                      }}
                      disabled={false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMeetDialog;
