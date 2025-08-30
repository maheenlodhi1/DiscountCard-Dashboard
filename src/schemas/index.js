import * as Yup from "yup";

const passRegExp = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

export const customerValidation = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phoneNo: Yup.string().required("Phone number is required"),
  email: Yup.string().email().required("Email is required"),
  nationality: Yup.object({
    value: Yup.string().required("Please select a nationality"),
    label: Yup.string(),
  }),
  password: Yup.string()
    .matches(
      passRegExp,
      "Password must contain atlest one character, one digit and should be minimum length of 8"
    )
    .required("Password is required"),
});

export const adValidation = Yup.object({
  title: Yup.string()
    .max(50, "Ad title can be maximum of 50 characters")
    .required("Please enter Ad Title"),
  description: Yup.string()
    // .min(20, "Ad description must be at least 20 characters")
    // .max(200, "Ad description must be at most 200 characters")
    .required("Please enter Ad Description"),

  imageUrl: Yup.string()
    .url("Image URL isn't valid")
    .required("Please enter Ad Image URL"),
  startDate: Yup.date(),
  expirationData: Yup.date(),
});

export const notificationValidation = Yup.object({
  title: Yup.string().required("Please enter Notification Title"),
  message: Yup.string().required("Please enter Notification Message"),
});

export const partnerValidation = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phoneNo: Yup.string().required("Phone number is required"),
  email: Yup.string().email().required("Email is required"),
  businessName: Yup.string().required("Business Name is required"),
  nationality: Yup.object({
    value: Yup.string().required("Please select a nationality"),
    label: Yup.string(),
  }),

  password: Yup.string()
    .matches(
      passRegExp,
      "Password must contain atlest one character, one digit and should be minimum length of 8"
    )
    .required("Password is required"),
});

export const offerValidation = Yup.object({
  partner: Yup.object({
    value: Yup.string().required("Please Select a Partner"),
    label: Yup.string(),
  }),
  title: Yup.string().required("Please enter Offer Title"),
  discount: Yup.number()
    .min(1)
    .max(100)
    .required("Please add a discount to your offer"),
  images: Yup.array()
    .min(1, "Please add images to your offer")
    .max(20, "You can add 20 images max")
    .required("Please add images to your offer"),
  categoryName: Yup.object({
    value: Yup.string().required("Please select a category"),
    label: Yup.string(),
  }),
  days: Yup.array().min(1, "Please select atleast one day").required(),
  offerAvailTime: Yup.object({
    startTime: Yup.string().required("Start time is required"),
    endTime: Yup.string().required("End time is required"),
  }).required("Please specify the offer availability time"),
  duration: Yup.object({
    value: Yup.string().required("Please select duration of offer"),
    label: Yup.string(),
  }),

  description: Yup.string().required("Please add description of offer"),
  isFeatured: Yup.boolean().default(false),
});
