import { Box , Button, Typography} from "@mui/material";
import Time from "../Time/Time";
import DateInput from "../Date/Date";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { getLoggedInUser , addSlot } from "../../lib/data-service";
import { toast } from "sonner";

type FormValues = {
  date: string;
  startTime: string;
  endTime: string;
};

export default function CreateSlotModal() {
  const [showModal, setShowModal] = useState(true);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: { date: "", startTime: "", endTime: "" },
  }); 

    const onSubmit = async (data: FormValues) => {
    try{
        setLoading(true);
        const user = await getLoggedInUser();
        // console.log("Logged in user:", user);
        const slotData = {
          date: data.date,
          start_time: data.startTime,
          end_time: data.endTime,
          provider_id: user?.id,
        };
        await addSlot(slotData)

        toast.success("Slot created successfully");
        setShowModal(false);
      }catch(err){
          console.error("Error creating slot:", err);
          toast.error("Failed to create slot. Please try again.");
        }finally {
          setLoading(false);
        }
    };

    if (!showModal) return null;
    return (
      <Box sx={{ mt: 2, backgroundColor: "#ffffff", p: 4, borderRadius: 2,}}>
        <Typography variant="h5" fontWeight={700} fontSize={20}sx={{ mb: 1 }}>
          Create New Availability Slot
        </Typography>

        <Typography variant="body1" fontSize={14} sx={{mb: 4, color: "text.secondary" }}>
          Set your available time slots for appointments
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{display: "grid",gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr  1fr" },   gap: 4,   mb: 4, }}>

            <Controller
              name="date"
              control={control}
              rules={{ required: "Date is required" }}
              render={({ field, fieldState }) => (
                <DateInput
                  {...field}
                  label="Date"
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="startTime"
              control={control}
              rules={{
                required: "Start time is required" 
              }}
              render={({ field, fieldState }) => (
                <Time
                  {...field}
                  label="Start Time"
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="endTime"
              control={control}
              rules={{ required: "End time is required" ,
                validate: (value, formValues) =>
                value > formValues.startTime || "End time must be after start time",
              }}
              render={({ field, fieldState }) => (
                <Time
                  {...field}
                  label="End Time"
                  error={fieldState.error?.message}
                />
              )}
            />

          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button type="submit"  variant="contained"
            sx={{ mt: 3  , fontSize: 16 }}
            disabled={loading} >
                {loading ? "Creating..." : "Create Slot"}
            </Button>

            <Button variant="outlined" sx={{ mt: 3  , fontSize: 16 }} 
            onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </Box>
        </form>
  
      </Box>
      )
    }