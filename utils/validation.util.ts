// import { z } from 'zod';
// import { fromZodError } from 'zod-validation-error';
// import { ZodSchema } from 'zod/lib';

// export function checkValidation(data: any, schema: ZodSchema): string[] | null {
//     const results = schema.safeParse(data);
//     return results.success ? null : fromZodError(results.error, { issueSeparator: '<;>' }).message.replace('Validation error: ', '').split('<;>').map(e => e.slice(0, e.indexOf('. at') + 1));
// };

//Schemas

// export const LinkSchema = z.string()
//     .url('Enter correct URL.');

// export const MessageSchema = z.string()
//     .min(1, 'Message should contain 1 to 500 characters.')
//     .max(500, 'Message should contain 1 to 500 characters.');

// export const AccountSettingsSchema = z.object({
//     avatar: z.string()
//         .url('Enter correct URL.'),
//     username: z.string()
//         .min(1, 'Username should contain 1 to 20 characters.')
//         .max(20, 'Username should contain 1 to 20 characters.'),
// });
