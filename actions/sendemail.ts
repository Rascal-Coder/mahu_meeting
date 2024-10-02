import axios from "axios";
import toast from "react-hot-toast";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/send`;

const sendEmail = async (values: any): Promise<any> => {

	try {
		    if (!values.email || !values.name) {
		      toast('请填写所有字段') // 替换为中文
		      return;
		    }
	  
		    const res = await axios.post(`${URL}`, {
		      email: `${values.email}`,
		      name: `${values.name}`,
		    });
		    console.log(res.data);
			
		    toast('邀请已发送!') // 替换为中文
		  } catch (error: any) {
		    console.log(error);
		    toast('邀请失败!'); // 替换为中文
		  }

};

export default sendEmail;
