import { z } from 'zod';

export const navigationLinkValidation = z.object({
  label: z.string().min(1),
  src: z.string().min(1),
  icon: z.string().optional(),
  children: z
    .array(
      z.object({
        label: z.string().min(1),
        src: z.string().min(1),
        icon: z.string().optional(),
      })
    )
    .optional(),
});

export const navigationBarValidation = z.array(navigationLinkValidation);

export const heroValidadion = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(20).max(255),
  callToAction: z
    .object({
      label: z.string().min(1),
      action: z.string().min(1),
    })
    .optional(),
});

export const ChainNetwork = z.object({
  name: z.string(),
  chainId: z.number(),
});

export type NavLink = z.infer<typeof navigationLinkValidation>;
export type NavigationBar = z.infer<typeof navigationBarValidation>;
export type Hero = z.infer<typeof heroValidadion>;
export type Network = z.infer<typeof ChainNetwork>;
