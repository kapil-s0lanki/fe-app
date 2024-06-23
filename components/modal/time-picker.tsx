import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const TimePickerComponent = ({ form }: { form: any }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(
    new Date(new Date().getTime() + 60 * 60 * 1000)
  );

  return (
    <div className=" w-full flex flex-col gap-5 items-center justify-start">
      <FormField
        control={form.control}
        name="start.dateTime"
        render={({ field }) => (
          <FormItem className=" w-full flex flex-col gap-2">
            <FormLabel>Start Date</FormLabel>
            <FormControl>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  field.onChange(date?.toISOString());
                }}
                showTimeSelect
                dateFormat="Pp"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div>--To--</div>
      <FormField
        control={form.control}
        name="end.dateTime"
        render={({ field }) => (
          <FormItem className=" w-full flex flex-col gap-2">
            <FormLabel>End Time</FormLabel>
            <FormControl>
              <DatePicker
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date);
                  field.onChange(date?.toISOString());
                }}
                showTimeSelect
                dateFormat="Pp"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TimePickerComponent;
