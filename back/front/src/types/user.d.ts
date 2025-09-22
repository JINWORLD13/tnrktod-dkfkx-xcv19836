interface Register {
  email: string;
  password: string;
  name: string;
  phone: string;
}
interface Change {
  email: string;
  password: string;
  name: string;
  phone: string;
}
interface Login {
  email: string;
  password: string;
}
interface Withdraw {
  password: string;
  confirmPassword: string;
}
interface Info {
  name: string;
  email: string;
  phone: string;
  password: string;
  point: string;
}
interface User {
  name: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string,
  point: string,
}