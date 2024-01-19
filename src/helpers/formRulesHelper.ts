import { Rule } from "rc-field-form/lib/interface";

const requiredRule: Rule = {
    required: true,
    message: 'Ô này không được để trống'
};

const typeEmail: Rule = {
    type: 'email',
    message: 'Email không đúng định dạng'
};

export const rulesHelper = {
    requiredRule,
    typeEmail
};
