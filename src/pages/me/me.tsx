import React, { useContext, useState } from "react";
import StoreContext from "../../store";
import styled from "styled-components";
import { addCustomer } from "../../api";
import { Redirect } from "react-router-dom";

interface Props {}

export const Me = (props: Props): JSX.Element => {
  let { customer, setCustomer } = useContext(StoreContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState<string>();

  if (loading) {
    return (
      <Page>
        <h2>Loading</h2>
      </Page>
    );
  }

  if (redirect) {
    return <Redirect to={redirect} />
  }

  if (!customer) {
    return (
      <Page>
        <h2>Please put in your details</h2>
        <Form>
          <label>First Name</label>
          <input
            placeholder="Bob"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <label>Last Name</label>
          <input
            placeholder="Smith"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          <button
            type="submit"
            onClick={async (event) => {
              event.preventDefault();
              setLoading(true);
              const customer = await addCustomer({ firstName, lastName });
              localStorage.setItem('customer', JSON.stringify(customer));
              setCustomer(customer);
              setLoading(false);
              setRedirect('/')
            }}
          >
            Continue
          </button>
        </Form>
      </Page>
    );
  }

  return (
    <Page>
      <p>me</p>
      <p>{customer.firstName}</p>
      <p>{customer.lastName}</p>
    </Page>
  );
};

const Page = styled.main`
  min-height: calc(101vh - 300px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
