import * as Yup from "yup";



export const PropertyValid = Yup.object().shape({
    Title: Yup
    .string()
    .required()
    .min(6, "min 6 characters"),
    Bedroom: Yup
    .number()
    .typeError('Enter valid bedroom number')
    .required('This field is required'),
    Bathroom: Yup
    .number()
    .typeError('Enter valid bedroom number')
    .required('This field is required'),

    Location:Yup
    .string()
    .required()
    .min(6, "min 6 characters"),
    PricePerVisit: Yup
    .number()
    .typeError('Enter valid bedroom number')
    .required('This field is required'),

});
