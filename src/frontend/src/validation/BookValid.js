import * as Yup from "yup";



export const BookValid = Yup.object().shape({
    VisitorName: Yup
    .string()
    .required()
    .min(6, "min 6 characters"),
    
    VisitorEmail: Yup.string().email().required()

});
