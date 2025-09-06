import { Input as InterInput } from './Input';
import { Password } from './Password';
export type { InputProps, PasswordProps } from './type';
type CompoundedComponent = typeof InterInput & {
  Password: typeof Password;
};
const Input = InterInput as CompoundedComponent;
Input.Password = Password;
export { Input };
