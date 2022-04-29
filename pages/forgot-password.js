import Layout from '../layouts/Main';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { server } from '../utils/server'; 
import { postData } from '../utils/services'; 

const ForgotPassword = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async data => {
    const res = await postData(`${server}/api/login`, {
      email: data.email,
      password: data.password
    });
  };

  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          <div className="back-button-section">
            <Link href="/products">
              <a><i className="icon-left"></i> Back to shop</a>
            </Link>
          </div>

          

        </div>
      </section>
    </Layout>
  )
}
  
export default ForgotPassword