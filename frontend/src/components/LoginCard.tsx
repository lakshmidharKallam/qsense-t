import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import logo from '../assets/logo.png';

import '../styles/NavbarStyles.css';

// Import the login functionality
import { passCheck, login } from '../user/userData';
import React from 'react';

// Define interfaces
interface LoginFormValues {
  username: string;
  password: string;
}

const LoginCard: FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<LoginFormValues>();

  const onFinish = async (values: LoginFormValues): Promise<void> => {
    const { username, password } = values;
    
    if (login(username, password)) {
      message.success('Login successful');
    	navigate('/model');

    //   try {
    //     const response = await fetch('/frontend/frontend/api/write-login-status', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         username,
    //         action: 'login' as const,
    //       }),
    //     });

    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
        
    //     navigate('/model');
    //   } catch (error) {
    //     console.error('Error sending login status:', error);
    //   }
    } else {
      console.log('Invalid credentials');
      message.error('Invalid username or password');
    }
  };
	return (
		<>
			<div className="Heading flex items-center gap-3">
				<img className="w-24 largescreen:w-48" src={logo} alt="Logo" />
				<h1 className="QsenseLable text-4xl largescreen:text-7xl">
					Qsense
					<br />
					Closed Loop Control
				</h1>
			</div>
			<Form
				name="login"
				initialValues={{
					remember: true,
				}}
				className="w-full pt-16"
				onFinish={onFinish}>
				<Form.Item
					name="username"
					rules={[
						{
							required: true,
							message: 'Please input your Username!',
						},
					]}>
					<Input
						size="large"
						prefix={<UserOutlined />}
						placeholder="Please enter your username"
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: 'Please input your Password!',
						},
					]}>
					<Input
						size="large"
						prefix={<LockOutlined />}
						type="password"
						placeholder="Please enter your password"
					/>
				</Form.Item>
				<Form.Item>
					<Flex justify="space-between" align="center">
						<a className="text-blue" href="">
							Forgot password?
						</a>
					</Flex>
				</Form.Item>

				<Form.Item>
					<Button
						size="large"
						className="bg-blue"
						block
						type="primary"
						htmlType="submit">
						Log in
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default LoginCard;
