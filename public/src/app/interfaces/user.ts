declare interface Users {
  user_cell_phone?: string;
  user_email?: string;
  user_id?: string;
  user_rol?: number;
  user_name?: string;
  user_lastname?: string;
  user_password?: string;
  user_password_confirm?: string;
  user_url_photo?: string;
  user_description_services?: string;
  user_categorys?: Array<Category>;
  user_country?: string;
  user_web?: string;
  user_register_date?: string;
  user_register_time?: string;
  user_state_account?: boolean;
  user_register_stepOne?: boolean;
  user_register_stepTwo?: boolean;
  user_register_stepThree?: boolean;
  user_register_stepFour?: boolean;
  user_register_stepFive?: boolean;
  user_register_stepSix?: boolean;
  user_register_stepSeven?: boolean;
  user_security_code?: boolean;
}