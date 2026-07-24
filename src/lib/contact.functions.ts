import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z.object({
      name: z.string().min(2),
      phone: z.string().min(8),
      email: z.string().email(),
      message: z.string().min(5),
    }).parse(data)
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );

    const { error } = await supabaseAdmin
      .from("enquiries")
      .insert({
        name: data.name,
        phone: data.phone,
        email: data.email,
        message: data.message,
        status: "new",
      });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  });