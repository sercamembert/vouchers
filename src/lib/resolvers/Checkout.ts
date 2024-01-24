import { z } from "zod";
const schema = z.object({
  price: z.number(),

  buyerFullName: z
    .string()
    .min(5, {
      message: "Minimalna liczba znaków dla Imienia i Nazwiska wynosi 5",
    })
    .max(120, {
      message: "Maksymalna liczba znaków dla Imienia i Nazwiska wynosi 120",
    }),

  receiverFullName: z
    .string()
    .min(5, {
      message: "Minimalna liczba znaków dla Imienia i Nazwiska wynosi 5",
    })
    .max(120, {
      message: "Maksymalna liczba znaków dla Imienia i Nazwiska wynosi 120",
    }),

  email: z
    .string()
    .email("Nieprawidłowy adres email")
    .min(5, {
      message: "Minimalna liczba znaków dla adresu email wynosi 5",
    })
    .max(50, {
      message: "Maksymalna liczba znaków dla adresu email wynosi 50",
    }),

  phone: z
    .string()
    .min(9, { message: "Nieprawidłowy numer telefonu" })
    .max(9, { message: "Nieprawidłowy numer telefonu" }),

  street: z
    .string()
    .min(5, {
      message: "Minimalna liczba znaków dla ulicy wynosi 5",
    })
    .max(50, {
      message: "Maksymalna liczba znaków dla ulicy wynosi 50",
    }),

  streetNumber: z
    .string()
    .min(1, {
      message: "Uzupełnij to pole",
    })
    .max(15, {
      message: "Maksymalna liczba znaków dla numeru ulicy wynosi 15",
    }),

  zipCode: z
    .string()
    .min(6, { message: "Podaj kod pocztowy w formacie ##-###" })
    .max(6, { message: "Podaj kod pocztowy w formacie ##-###" }),

  city: z
    .string()
    .min(3, {
      message: "Wpisz miasto",
    })
    .max(20, {
      message: "Maksymalna liczba znaków dla miasta wynosi 20",
    }),
});

export default schema;

export type CheckoutType = z.infer<typeof schema>;
