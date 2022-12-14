import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import type { NextPage } from "next";
import { useForm, Resolver } from "react-hook-form";
import { useRecoilState } from "recoil";
import Router from "next/router";
import axios from "axios";
import { ChangeEvent, useState } from 'react';

enum GenderEnum {
  female = 'female',
  male = 'male',
  other = 'other'
}
type Zipcode = {
  main: string;
  sub: string;
};
type Address = {
  address1: string;
  address2: string;
  address3: string;
};
interface InputFormType {
  required: string;
  firstName: string;
  lastName: string;
  name: string;
	age: number;
	mail: string;
	phone: number;
  gender: GenderEnum;
  zip: Zipcode;
  address: Address;
}

// const resolver: Resolver<InputFormType> = async (values) => {
//   return {
//     values: values.firstName ? values : {},
//     errors: !values.firstName
//       ? {
//           firstName: {
//             type: 'required',
//             message: 'This is required.',
//           },
//         }
//       : {},
//   };
// };

const Input: NextPage = (event: ChangeEvent<HTMLInputElement>) => {

  const [zipcode, setZipcodeMain] = useState<Zipcode>({
    main: "",
    sub: ""
  });
  const [address, setAddress] = useState<Address>({
    address1: "",
    address2: "",
    address3: ""
  });
  const updateZipcodeMain = (e: ChangeEvent<HTMLInputElement>) => {
    setZipcodeMain({ ...zipcode, main: e.target.value });
  };
  const updateZipcodeSub = async (e: ChangeEvent<HTMLInputElement>) => {
    setZipcodeMain({ ...zipcode, sub: e.target.value });
    if (e.target.value.length === 4 && zipcode.main.length === 3) {
      try {
        const res = await axios.get(
          "https://zipcloud.ibsnet.co.jp/api/search",
          {
            params: {
              zipcode: zipcode.main + e.target.value
            }
          }
        );
        if (res.data.results) {
          const result = res.data.results[0];
          setAddress({
            ...address,
            address1: result["address1"],
            address2: result["address2"],
            address3: result["address3"]
          });
        }
      } catch {
        alert("???????????????????????????????????????");
      }
    }
  };

  const { register, setValue, handleSubmit, formState: { errors } } = 
  useForm<InputFormType>({
    mode: "onChange",
    criteriaMode: "all",
    shouldFocusError: false,
  });


  const onSubmit = handleSubmit((data: InputFormType) => {
    Router.push("/confirm");
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        {/* <div>
          <label >??????</label>
          <input {...register("firstName")} placeholder="Bill" />
      {errors?.firstName && <p>{errors.firstName.message}</p>}
        </div> */}
        <div>
          <label>
            <span>??????</span>
            <input type="text" autoComplete="name" placeholder="?????? ??????" {...register("name", { required: true, })} />
            {errors?.name?.type === "required" && (
          <div style={{ color: 'red' }}>???????????????????????????????????????</div>
            )}
          </label>
          
        </div>
        <div>
          <label>
            <span>??????</span>
            <input type="number" autoComplete="age"  {...register("age", { required: true, })} />
          </label>
        </div>
        <div>
          <label>
            <span>????????????</span>
            <input type="zip" autoComplete="postal-code" maxLength={7} placeholder="0000000" {...register("zip", { required: true, })} />
            {errors?.name?.type === "required" && (
          <div style={{ color: 'red' }}>?????????????????????????????????????????????</div>
            )}
          </label>
          
        </div>
        {/* <div>
          <label>
            <span>????????????</span>
            <input type="text" onChange={updateZipcodeMain} value={zipcode.main} />
        <span> - </span>
        <input type="text" onChange={updateZipcodeSub} value={zipcode.sub} />
          </label>
        </div> */}
        <div>
          <label>
            <span>??????</span>
            <input type="address" autoComplete="address" name="????????????" {...register("address", { required: true, })} />
          </label>
          {/* <p>???????????? {address.address1}</p>
          <p>???????????? {address.address2}</p>
          <p>?????? {address.address3}</p>
          <p>?????? ???????????????<input type="text" /></p> */}
          
        </div>
        <div>
        <label>
                <span>??????:</span>
                <select {...register('gender')}>
                    <option value="female">female</option>
                    <option value="male">male</option>
                    <option value="other">other</option>
                </select>
            </label>
        </div>
        <label>
          <span>?????????????????????:</span>
          <input type="mail"  placeholder="example@mail.com"  autoComplete="email" {...register("mail", { required: true, pattern: /.+@.+/ })} />
        </label>
        {/* We use optional chaining (?.)
            to make null-checks easier. */}
        {errors?.mail?.type === "required" && (
          <div style={{ color: 'red' }}>??????????????????????????????????????????????????????</div>
        )}
        {/* Different errors have different types,
            so we can render any message for any error
            we want to. */}
        {errors?.mail?.type === "pattern" && (
          <div style={{ color: 'red' }}>???????????????????????????????????????????????????</div>
        )}
        <div>
          <label>
            <span>????????????:</span>
            <input type="tel" name="phone" placeholder="090-1234-1234" autoComplete="tel" {...register("phone", { required: true, pattern: /\d{11}/, })}  />
          </label>
          {errors?.phone?.type === "required" && (
          <div style={{ color: 'red' }}>?????????????????????????????????????????????</div>
        )}
        {errors?.phone?.type === "pattern" && (
          <div style={{ color: 'red' }}>??????????????????????????????????????????</div>
        )}
        </div>
        
        <div>
          <button type="submit">???????????? !!</button>
        </div>
      </form>
    </div>
  );
};

export default Input;
