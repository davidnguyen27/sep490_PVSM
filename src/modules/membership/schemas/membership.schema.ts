import { z } from "zod";

export const membershipSchema = z.object({
  name: z.string().min(1, "Tên hạng không được để trống"),
  minPoints: z
    .number({ invalid_type_error: "Điểm tối thiểu phải là số" })
    .min(0, "Điểm tối thiểu phải >= 0"),
  rank: z.enum(["bronze", "silver", "gold", "platinum", "diamond"], {
    required_error: "Hạng không được để trống",
  }),
  benefits: z.string().optional(),
  description: z.string().optional(),
});

export type MembershipSchema = z.infer<typeof membershipSchema>;
