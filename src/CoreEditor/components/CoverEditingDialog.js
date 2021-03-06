// @flow
import React from 'react';
import Modal from 'react-modal';
import { Tab, Tabs, Row, Col, Nav, NavItem, Button } from 'react-bootstrap';
import EditorComponent from './EditorComponent';
import Loading from 'base/components/misc/Loading';

type CoverDialogTypes = {
  showDialog: boolean,
  onCloseDialog: Function,
};

const CoverTabs = ({
  children, tabs, onNewTab, tab, onCoverTabChange,
}) => (
<Tab.Container
  id="tabcontainer"
  activeKey={tab.key}
  onSelect={key =>
    key === 'new'
      ? onNewTab()
      : onCoverTabChange(key)
  }
>
  <div style={{ marginLeft: 15, marginRight: 15 }}>
    <Row className="card card-nav-tabs">
      <div className="core card-content col-xs-12">
        <div className="header header-primary">
          <div className="nav-tabs-navigation">
            <div className="nav-tabs-wrapper">
              <Nav bsStyle="tabs">
                {tabs.map(tab =>
                  (<NavItem eventKey={tab.key} key={tab.key}>
                     { tab.name }
                     <div className="ripple-container"></div>
                   </NavItem>)
                )}
                <NavItem eventKey="new"><span className="glyphicon glyphicon-plus-sign"></span>
                  <div className="ripple-container"></div>
                </NavItem>
              </Nav>
            </div>
          </div>
        </div>

        <Tab.Content animation className="card-content">
          {children}
        </Tab.Content>
      </div>
    </Row>
  </div>
</Tab.Container>);

const CoverDialog = ({
  imageUrl, imageUrlChange,
  showDialog,
  onCloseDialog,
  onSubmitDialog,
  editorChanged,
  openLinkDialog,
  tabs,
  tab,
  onCoverTabChange,
  onCoverTabDelete,
  onNewCover,
}:
CoverDialogTypes) => {
  const previewBusy = false;
  return (
    <div style={styles.linkTitleInputContainer}>
      <Modal
        shouldCloseOnOverlayClick
        style={modalStyles}
        isOpen={showDialog}
        contentLabel="EditCover"
      >
        <CoverTabs
          tabs={tabs}
          tab={tab}
          onNewTab={onNewCover}
          onCoverTabChange={onCoverTabChange}
        >
          <div className="cover-edit">
            <EditorComponent
              editorState={tab.editorState}
              editorName="COVEREDITOR_"
              editorChanged={editorChanged}
              openImageDialog={()=> {}}
              openLinkDialog={openLinkDialog}
            />
          </div>
          <div className="core">
            <div className="form-group">
              <label className="col-sm-4 col-md-3 control-label" htmlFor="linkUrl">Image URL</label>
              <div className="col-sm-8 col-md-9">
                <input
                  onChange={e => imageUrlChange(e.target.value)}
                  type="text"
                  value={imageUrl}
                  className="form-control"
                />{' '}
              </div>
              {previewBusy && (<Loading />)}
            </div>
            <div className="form-group col-xs-12">
              <div className="navbar-left">
                <button className="btn btn-danger" onClick={() => onCoverTabDelete(tab.key)}>
                  <span className="glyphicon glyphicon-trash with_text" />Remove
                </button>
              </div>
              <div className="navbar-right">
                <button className="btn btn-default" onClick={onCloseDialog}>
                  <span className="glyphicon glyphicon-remove with_text" />Cancel
                </button>
                <button className="btn btn-primary" onClick={onSubmitDialog}>
                  <span className="glyphicon glyphicon-ok with_text" />Submit
                </button>
              </div>
            </div>
          </div>
        </CoverTabs>

      </Modal>
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 130,
  },
  content: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: 'none',
    background: '#00000000',
    overflow: 'initial !important',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '0px',
    outline: 'none',
    padding: '20px',
    height: '70%',
  },
};

const styles = {
  root: {
    fontFamily: "'Arial', serif",
    padding: 20,
    width: 600,
  },
  buttons: {
    marginBottom: 10,
  },
  linkTitleInputContainer: {
    marginBottom: 10,
  },
  linkTitleInput: {
    fontFamily: "'Arial', serif",
    marginRight: 10,
    padding: 3,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
};
export default CoverDialog;
