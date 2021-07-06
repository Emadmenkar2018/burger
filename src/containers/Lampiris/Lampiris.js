
import React, { useState } from 'react'
import { Input, Menu, message, Dropdown, Button, Radio, Steps, Space } from 'antd';
import { UserOutlined, DownOutlined, } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './Lampiris.css'
import RadioButtons from '../../components/RadioButtons/RadioButtons.js'
import DropdownButton from '../../components/DropdownButton/DropdownButton.js'
import FloatingInput from '../../components/FloatingInput/FloatingInput.js'
import UDatePicker from '../../components/DatePicker/UDatePicker';
import { Checkbox } from 'antd';


const { Step } = Steps;


let initSteps = [
    {
        title: "Step 1"
    }
    // {
    //     title: "Step 2"
    // },
    // {
    //     title: "Step 3"
    // },
    // {
    //     title: "Step 4"
    // },
    // {
    //     title: "Step 5"
    // }
]

const Lampiris = () => {

    const [steps, setsteps] = useState(initSteps)
    const [current, setCurrent] = useState(0)
    const [radio, setradio] = useState(1)
    const [title, settitle] = useState(1)
    const [language, setlanguage] = useState("Langue")
    const [color, setcolor] = useState("Code Couleur (Solvabilite)")
    const [name, setname] = useState('');


    const onChange = (index) => setCurrent(index)
    const onChangeRadio = (index) => setradio(index.target.value)
    const onChangeTitle = (index) => settitle(index.target.value)
    const handleChangeName = (e) => setname(e.target.value)



    function handleButtonClick(e) {
        message.info('Click on left button.');
        console.log('click left button', e);
    }

    function handleLanguageClick({ key }) {
        message.info('Click on menu item.');
        console.log('click', key);
        setlanguage(key)
    }

    function handleColorClick({ key }) {
        message.info('Click on menu item.');
        console.log('click', key);
        setcolor(key)
    }

    const languages = (
        <Menu onClick={handleLanguageClick}>
            <Menu.Item key="Francais" icon={<UserOutlined />}>
                Francais
            </Menu.Item>
            <Menu.Item key="Neerlandies" icon={<UserOutlined />}>
                Neerlandies
            </Menu.Item>
        </Menu>
    );

    const colors = (
        <Menu onClick={handleColorClick}>
            <Menu.Item key="Vert" icon={<UserOutlined />}>
                Vert
            </Menu.Item>
            <Menu.Item key="Orange" icon={<UserOutlined />}>
                Orange
            </Menu.Item>
            <Menu.Item key="Non Verifee" icon={<UserOutlined />}>
                Non Verifee
            </Menu.Item>
        </Menu>
    );

    const titles = ["Mme.", "Mlle.", "Mr."]
    const identifications = ["A", "B"]

    function onChangeDate(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    function onOk(value) {
        console.log('onOk: ', value);
    }

    const onChangefacturation = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }

    const onChangeinstallation = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }


    const moveToNextStep = () => {
        if (steps.length < 4) {
            let newStep = {
                title: `Étape ${steps.length + 1}`
            }
            let newSteps = [...steps, newStep]
            setsteps(newSteps)
        }

    }
    return (

        <div className="bigDiv">


            <div className="rowSteps">

                <div>Proximus - Nouveau  Contrat</div>
                <Steps
                    current={0} 
                    percent={60}
                    // type="navigation"
                    className="mysteps"
                    current={current}
                    onChange={onChange}
                    style={{ width: '50%',  backgroundColor:'#efefef'}}
                >
                    {steps?.map(item => {
                        return (
                            <Step title={item.title} status="wait" icon={<UserOutlined />}/>
                        )
                    })
                    }
                </Steps>
            </div>


            <div className="contain">

                <div className="title">Étape 1 : FICHE D'IDENTIFICATION DU CLIENT</div>

                <RadioButtons inputs={identifications} onChange={onChangeRadio} value={radio} />


                <div className="rowCont">

                    <div className="col-md-3 col-12 mb-3 mb-md-0">

                        <DropdownButton styleName="omarStyle" overlay={languages} >
                            {language} <DownOutlined />
                        </DropdownButton>

                    </div>


                    <div className="col-md-6 col-12 mb-3 mb-md-0">
                        <Input placeholder="N° Carte d'identité" />
                    </div>

                    <div className="col-md-3 col-12 mb-3 mb-md-0">

                        <DropdownButton styleName="omarStyle" overlay={colors} >
                            {color} <DownOutlined />
                        </DropdownButton>

                    </div>

                </div>

                <div className="rowCont">

                    <div className="col-md-3 col-12 mb-3 mb-md-0">
                        <RadioButtons inputs={titles} onChange={onChangeTitle} value={title} />
                    </div>



                    <div className="col-md-5 col-12 mb-3 mb-md-0">
                        <FloatingInput placeholder="Nom" onChange={handleChangeName} value={name} />
                        {/* <Input placeholder="Nom" /> */}
                    </div>

                    <div className="col-md-2 col-12 mb-3 mb-md-0">
                        <Input placeholder="Prenom" />
                    </div>

                    <div className="col-md-2 col-12 pr-0 mb-3 mb-md-0">
                        <UDatePicker onChange={onChangeDate} onOk={onOk} placeholder="Prenom" />
                    </div>

                </div>

                <div className="rowCont">

                    <div className="col-md-6 col-12 mb-3 mb-md-0">
                        <Input placeholder="Adresse" />
                    </div>

                    <div className="col-md-2 col-12 mb-3 mb-md-0">
                        <Input placeholder="Numero" />
                    </div>

                    <div className="col-md-2 col-12 mb-3 mb-md-0">
                        <Input placeholder="Etage" />
                    </div>

                    <div className="col-md-2 col-12 mb-3 mb-md-0">
                        <Input placeholder="Boite" />
                    </div>

                </div>

                <div className="rowCont">

                    <div className="col-md-6 col-12 mb-3 mb-md-0">
                        <Input placeholder="Code Postal" />
                    </div>

                    <div className="col-md-2 col-12 mb-3 mb-md-0">
                        <Input placeholder="Localite" />
                    </div>

                    <div className="col-md-2 col-12 mb-3 mb-md-0">
                        <Input placeholder="Adresse Email" />
                    </div>

                    <div className="col-md-2 col-12 mb-3 mb-md-0">
                        <Input placeholder="Numero de contact" />
                    </div>

                </div>

                <div className="rowCont">

                    <div className="col-md-6 col-12 mb-3 mb-md-0">
                        <Checkbox onChange={onChangefacturation}>Adresse de facturation différente de l’adresse du client</Checkbox>
                    </div>

                </div>

                <div className="rowCont">

                    <div className="col-md-6 col-12 mb-3 mb-md-0">
                        <Checkbox onChange={onChangeinstallation}>Adresse d'installation différente de l’adresse du client</Checkbox>
                    </div>


                </div>
                <div className="rowCont">

                    <Space size={10} />

                </div>

                <div className="rowBtn">

                    <Button onClick={moveToNextStep} type="primary" shape="round" size='middle'>
                        Etape Suivante
                    </Button>

                </div>
            </div>

        </div >
    )
}

export default Lampiris