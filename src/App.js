import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { applyMakeup } from './AppApi';
import Loader from 'react-loader-spinner';
import profileData from './profileData';
import lookData from './lookData';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { FormGroup, Checkbox, FormControlLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  img: {
    width: 82,
    height: 103,
    cursor: 'pointer',
    borderRadius: 6,
  },
  bigImg: {
    width: 280,
    height: 420,
  },
  lookContainer: {
    height: 540,
    overflowY: 'auto',
  },
  loader: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    zIndex: 1000,
  },
  dropdownbackdrop: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 990,
  },
  rowc1: {
    flex: '0 0 45%',
    maxWidth: '45%',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  active: {
    border: '3px solid #C1C6FE',
    '&:focus': {
      outline: 'none',
    },
  },
  label: {
    justifyContent: 'center',
    display: 'flex',
    font: 'Bold 12px/18px Montserrat',
    color: '#7F828E',
    width: 69,
  },
  biglabel: {
    justifyContent: 'center',
    fontSize: 18,
    display: 'flex',
    fontWeight: 'bold',
    width: 280,
    marginTop: '1rem',
  },
  circle: {
    position: 'relative',
    width: 69,
    height: 69,
    overflow: 'hidden',
    borderRadius: '50%',
  },
  alignCenter: {
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    font: 'Bold 26px/20px Montserrat',
    letterSpacing: 0,
    color: '#403B3B',
    display: 'flex',
  },
  headerText: {
    font: 'Normal 20px/23px Montserrat',
  },
  lookTitle: {
    font: 'Bold 15px/18px Montserrat',
    color: '#7F828E',
    marginBottom: 15,
  },
  controlTitle: {
    font: 'Bold 15px/18px Montserrat',
    color: '#7F828E',
    marginBottom: 5,
  },
  profileText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    font: 'Bold 15px/18px Montserrat',
    marginBottom: 15,
    color: '#7F828E',
  },
  leftContainer: {
    width: 284,
    flex: '0 0 284px',
    borderRight: '2px solid #D1D2D6',
    paddingRight: '11px !important',
  },
  rightContainer: {
    width: 1080,
  },
  w1: {
    width: 300,
    maxWidth: 300,
    marginRight: 40,
    paddingRight: '15px !important',
    borderRight: '1px solid #D3D3D3',
  },
  w2: {
    width: 455,
    maxWidth: 455,
    marginRight: 40,
    paddingRight: '15px !important',
    borderRight: '1px solid #D3D3D3',
  },
  section1: {
    paddingBottom: 20,
  },
  hrMax: {
    flex: '0 0 99%',
    maxWidth: '99%',
  },
  border: {
    borderBottom: '1px solid #D3D3D3',
    marginBottom: 35,
  },
}));

export default function App() {
  const classes = useStyles();

  const [activeProfile, setActiveProfile] = useState({});
  const [activeLook, setActiveLook] = useState({});
  const [versionLookData, setVersionLookData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    checkedEye: true,
    checkedLip: true,
    checkedBlush: true,
  });

  const prepareMakeup = () => {
    const eye = state.checkedEye;
    const blush = state.checkedBlush;
    const lip = state.checkedLip;
    let applyMakeupId;

    if ((eye && blush && lip) || (!eye && !blush && !lip)) {
      applyMakeupId = 0;
    } else if (lip && blush) {
      applyMakeupId = 4;
    } else if (eye && lip) {
      applyMakeupId = 5;
    } else if (blush && eye) {
      applyMakeupId = 6;
    } else if (lip) {
      applyMakeupId = 1;
    } else if (blush) {
      applyMakeupId = 2;
    } else if (eye) {
      applyMakeupId = 3;
    } else {
      applyMakeupId = 0;
    }

    return applyMakeupId;
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const onProfileSelect = (profile) => {
    setActiveProfile(profile);
  };

  const onLookSelect = (look) => {
    setActiveLook(look);
  };

  const onApplyMakeup = () => {
    const makeupId = prepareMakeup();
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    const request = {
      profileId: activeProfile.id,
      lookId: activeLook.id,
      applyId: makeupId,
    };

    setLoading(true);

    applyMakeup(request)
      .then((response) => {
        if (response.data && response.data.length) {
          setVersionLookData(response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <div>
      {loading && (
        <div>
          <div className={classes.dropdownbackdrop}></div>
          <div className={classes.loader}>
            <Loader type='Puff' color='#00BFFF' height={100} width={100} />
          </div>
        </div>
      )}
      <div>
        <Container fluid={true}>
          <Row noGutters={true}>
            <Col xs={12} md={12} className={`${classes.header}`}>
              <span>ARSENAL</span>
              <span className={`${classes.headerText}`}>Virtual Try-On</span>
            </Col>
            <Col xs={11} md={11} className={`${classes.hrMax}`}>
              <hr />
            </Col>
          </Row>
          <Row noGutters={true}>
            <Col xs={12} md={12} className={`${classes.section1}`}>
              <Row noGutters={true}>
                <Col className={`${classes.w1}`}>
                  <Row noGutters={true} className={`${classes.profileText}`}>
                    SELECT PROFILE
                  </Row>
                  <Row noGutters={true}>
                    {profileData.map((profile, i) => (
                      <Col xs={4} md={4} key={i}>
                        <img
                          className={`${classes.img} ${classes.circle} ${
                            activeProfile.id === profile.id
                              ? classes.active
                              : ''
                          }`}
                          src={
                            profile.icon ? profile.icon : profile.base64Image
                          }
                          alt=''
                          onClick={() => onProfileSelect(profile)}
                        />
                        <div className={classes.label}>
                          <label>{profile.name}</label>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Col>
                <Col className={`${classes.w2}`}>
                  <Row className={`${classes.lookTitle}`} noGutters={true}>
                    SELECT LOOK
                  </Row>
                  <Row noGutters={true}>
                    {lookData.map((look, i) => (
                      <Col className='pl-0' key={look.id}>
                        <img
                          className={`${classes.img} ${
                            activeLook.id === look.id ? classes.active : ''
                          }`}
                          src={look.base64Image}
                          alt=''
                          onClick={() => onLookSelect(look)}
                        />
                      </Col>
                    ))}
                  </Row>
                </Col>
                <Col>
                  <Row noGutters={true} className={`${classes.controlTitle}`}>
                    CONTROL APPLICATION
                  </Row>
                  <Row noGutters={true}>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedEye}
                            onChange={handleChange}
                            icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                            checkedIcon={<CheckBoxIcon fontSize='small' />}
                            name='checkedEye'
                            color='primary'
                          />
                        }
                        label='Eye Look'
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedLip}
                            onChange={handleChange}
                            icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                            checkedIcon={<CheckBoxIcon fontSize='small' />}
                            name='checkedLip'
                            color='primary'
                          />
                        }
                        label='Lip Look'
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedBlush}
                            onChange={handleChange}
                            icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                            checkedIcon={<CheckBoxIcon fontSize='small' />}
                            name='checkedBlush'
                            color='primary'
                          />
                        }
                        label='Blush'
                      />
                    </FormGroup>
                  </Row>
                  <Row noGutters={true}>
                    <Button
                      variant='primary'
                      disabled={!(activeProfile.id && activeLook.id)}
                      onClick={onApplyMakeup}
                    >
                      Try On
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col className={`${classes.hrMax} ${classes.border}`}></Col>
            <Col xs={12} md={12}>
              <div className='flex'>
                <div className='mr-5'>
                  <img
                    className={classes.bigImg}
                    src={activeProfile.base64Image}
                    alt=''
                  />
                  {activeProfile.base64Image && (
                    <div className={classes.biglabel}>
                      <label className='profile-label'>User Image</label>
                    </div>
                  )}
                </div>
                <div className='mr-5'>
                  <img
                    className={classes.bigImg}
                    src={activeLook.base64Image}
                    alt=''
                  />
                  {activeLook.base64Image && (
                    <div className={classes.biglabel}>
                      <label className='profile-label'>Selected Look</label>
                    </div>
                  )}
                </div>
                {versionLookData.map((look, i) => (
                  <div
                    className={`mr-5 ${
                      i === versionLookData.length - 1 ? 'pr-5' : ''
                    }`}
                    key={look.version}
                  >
                    <img
                      className={classes.bigImg}
                      src={look.base64Image}
                      alt=''
                    />
                    <div className={classes.biglabel}>
                      <label className='profile-label'>
                        Applied Look Version {look.version}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
