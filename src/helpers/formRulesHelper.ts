import { Rule } from "rc-field-form/lib/interface";

const requiredRule: Rule = {
    required: true,
    message: 'Ô này không được để trống'
};

const typeEmail: Rule = {
    type: 'email',
    message: 'Email không đúng định dạng'
};

const passwordRule: Rule = {
    validator: (_, value: string) => {
        if(value?.toString()?.includes(" ")){
            return Promise.reject(new Error("Mật khẩu không được chứa khoảng trắng"));
        }

        return Promise.resolve();
    }
};

export const rulesHelper = {
    requiredRule,
    typeEmail,
    passwordRule
};
