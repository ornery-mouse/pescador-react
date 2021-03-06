// ***************** THIRD PARTY IMPORTS **********************
import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { RiCloseCircleFill } from 'react-icons/ri'

import classes from './Waters.module.css'

const CreateWater = ({ user, closeClickHandler, waters, setWaters }) => {
    // **************** STATE ****************
    const [name, setName] = useState('')
    const [waterType, setWaterType] = useState('')

    // ************** GRAPHQL FUNCTIONS ****************

    // Create mutation for GQL to insert new Water
    const CREATE_WATER = gql`
    mutation createWater($name: String!, $type: String!, $userId: ID!){
        createWater(name: $name, type: $type, userId: $userId){
            name
            type
        }
    }
    `
    // Send mutation to GQL with information from form and user._id
    const [createWater] = useMutation(CREATE_WATER, {
        variables: {
            name: name,
            type: waterType,
            userId: user._id
        }
    })

    // ************** COMPONENT FUNCTIONS ***************
    // Capture name input
    const nameInput = event => {
        setName(event.target.value)
    }
    // Capture type input
    const waterTypeInput = event => {
        setWaterType(event.target.value)
    }
    // Handle form submission
    const submitHandler = event => {
        event.preventDefault()
        setWaters([...waters, {name: name, type: waterType, userId: user._id}])
        createWater()
        setName('')
        setWaterType('')
        closeClickHandler()
    }

    return (
        <>
            <form onSubmit={submitHandler} className={classes.CreateWaterForm}>
            <label htmlFor="name">Name:</label>
				<input type="text" id="name" onChange={nameInput} />
                <br></br>
				<select
					name="waterType"
					id="waterType"
					onChange={waterTypeInput}
				>
					<option value="">Select Water Type:</option>
					<option value="lake">Lake or Pond</option>
					<option value="stream">Stream</option>
                </select>
                <br></br>
                <input type="submit" />
            </form>
            <RiCloseCircleFill className={classes.icon} onClick={closeClickHandler}/>
        </>
        )
}

export default CreateWater
