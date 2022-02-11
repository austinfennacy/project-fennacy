import './submittalPdf.css'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Box, useMediaQuery } from '@material-ui/core'
import EditableBox from './edit/editableBox'
import ProjectDialog from './edit/projectDialog'
import DescriptionDialog from './edit/descriptionDialog'
import SubSpecDialog from './edit/subSpecDialog'
import AddressDialog from './edit/addressDialog'
import SupplierDialog from './edit/supplierDialog'
import SubstitutionDialog from './edit/substitutionDialog'
import WarrantyDialog from './edit/warrantyDialog'
import DcActionsDialog from './edit/dcActionsDialog'
import ArchitectActionsDialog from './edit/architectActionsDialog'
import ReceivedInfoDialog from './edit/receivedInfoDialog'
import ContractorRemarksDialog from './edit/contractorRemarksDialog'
import ArchitectRemarksDialog from './edit/architectRemarksDialog'
import DcRemarksDialog from './edit/dcRemarksDialog'
import TimelineDialog from './edit/timelineDialog'
import FloatDialog from './edit/floatDialog'
import TransmittedDialog from './edit/transmittedDialog'
import CopiesDialog from './edit/copiesDialog'
import SentDialog from './edit/sentDialog'

const useStyles = makeStyles((theme) => ({
  pdfScreen: {
    fontFamily: "'Times'",
    padding: "4vw",
    fontSize: "1.1vw",
  },
  pdfPrint: {
    fontFamily: "'Times'",
    padding: theme.spacing(6),
  },
  todofix: {
    color: "red"
  },
  title: {
    marginTop: "0",
    marginBottom: "0.5rem",
  },
  bold: {
    fontWeight: "bold",
  },
  smallScreen: {
    fontSize: "0.95vw"
  },
  smallPrint: {
    fontSize: "0.8rem",
  },
  underlined: {
    borderBottom: "1px solid black",
    display: "inline-block",
    width: "100%",
  },
  displayBlock: {
    display: "block",
  },
  contractorRemarks: {
    display: "-webkit-box",
    WebkitLineClamp: "3",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  dcRemarks: {
    display: "-webkit-box",
    WebkitLineClamp: "6",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  architectRemarks: {
    display: "-webkit-box",
    WebkitLineClamp: "5",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  noWrap: {
    whiteSpace: "nowrap",
  },
}))

export default function SubmittalPdf(props) {
  const id = props.id
  const [showEdit, setShowEdit] = useState(props.showEdit)
  useEffect(
    () => setShowEdit(props.showEdit),
    [props.showEdit],
  );

  const classes = useStyles()
  const pdfClass = useMediaQuery("screen")
    ? classes.pdfScreen
    : classes.pdfPrint
  const smallClass = useMediaQuery("screen")
    ? classes.smallScreen
    : classes.smallPrint

  const [submittal, setSubmittal] = useState({})
  useEffect(() => {
    fetchSubmittal()

    // https://stackoverflow.com/questions/55840294
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  const fetchSubmittal = () => fetch(`/api/submittal/${id}`)
    .then(res => res.json())
    .then((submittalJson) => setSubmittal(submittalJson))

  const [dialogState, setDialogState] = useState({
    isProjectOpen: false,
    isDescriptionOpen: false,
    isSubSpecOpen: false,
    isArchitectAddressOpen: false,
    isProjectAddressOpen: false,
    isContractorAddressOpen: false,
    isSupplierOpen: false,
    isSubstitutionOpen: false,
    isWarrantyOpen: false,
    isDcActionsOpen: false,
    isArchitectActionsOpen: false,
    isReceivedInfoOpen: false,
    isContractorRemarksOpen: false,
    isDcRemarksOpen: false,
    isArchitectRemarksOpen: false,
    isTimelineOpen: false,
    isFloatOpen: false,
    isTransmittedOpen: false,
    isCopiesOpen: false,
    isSentOpen: false,
  })

  const handleDialogState = {
    openProject: () => setDialogState({ ...dialogState, isProjectOpen: true}),
    closeProject: () => setDialogState({ ...dialogState, isProjectOpen: false}),
    openDescription: () => setDialogState({ ...dialogState, isDescriptionOpen: true}),
    closeDescription: () => setDialogState({ ...dialogState, isDescriptionOpen: false}),
    openSubSpec: () => setDialogState({ ...dialogState, isSubSpecOpen: true}),
    closeSubSpec: () => setDialogState({ ...dialogState, isSubSpecOpen: false}),
    openArchitectAddress: () => setDialogState({ ...dialogState, isArchitectAddressOpen: true}),
    closeArchitectAddress: () => setDialogState({ ...dialogState, isArchitectAddressOpen: false}),
    openProjectAddress: () => setDialogState({ ...dialogState, isProjectAddressOpen: true}),
    closeProjectAddress: () => setDialogState({ ...dialogState, isProjectAddressOpen: false}),
    openContractorAddress: () => setDialogState({ ...dialogState, isContractorAddressOpen: true}),
    closeContractorAddress: () => setDialogState({ ...dialogState, isContractorAddressOpen: false}),
    openSupplier: () => setDialogState({ ...dialogState, isSupplierOpen: true}),
    closeSupplier: () => setDialogState({ ...dialogState, isSupplierOpen: false}),
    openSubstitution: () => setDialogState({ ...dialogState, isSubstitutionOpen: true}),
    closeSubstitution: () => setDialogState({ ...dialogState, isSubstitutionOpen: false}),
    openWarranty: () => setDialogState({ ...dialogState, isWarrantyOpen: true}),
    closeWarranty: () => setDialogState({ ...dialogState, isWarrantyOpen: false}),
    openDcActions: () => setDialogState({ ...dialogState, isDcActionsOpen: true}),
    closeDcActions: () => setDialogState({ ...dialogState, isDcActionsOpen: false}),
    openArchitectActions: () => setDialogState({ ...dialogState, isArchitectActionsOpen: true}),
    closeArchitectActions: () => setDialogState({ ...dialogState, isArchitectActionsOpen: false}),
    openReceivedInfo: () => setDialogState({ ...dialogState, isReceivedInfoOpen: true}),
    closeReceivedInfo: () => setDialogState({ ...dialogState, isReceivedInfoOpen: false}),
    openContractorRemarks: () => setDialogState({ ...dialogState, isContractorRemarksOpen: true}),
    closeContractorRemarks: () => setDialogState({ ...dialogState, isContractorRemarksOpen: false}),
    openDcRemarks: () => setDialogState({ ...dialogState, isDcRemarksOpen: true}),
    closeDcRemarks: () => setDialogState({ ...dialogState, isDcRemarksOpen: false}),
    openArchitectRemarks: () => setDialogState({ ...dialogState, isArchitectRemarksOpen: true}),
    closeArchitectRemarks: () => setDialogState({ ...dialogState, isArchitectRemarksOpen: false}),
    openTimeline: () => setDialogState({ ...dialogState, isTimelineOpen: true}),
    closeTimeline: () => setDialogState({ ...dialogState, isTimelineOpen: false}),
    openFloat: () => setDialogState({ ...dialogState, isFloatOpen: true}),
    closeFloat: () => setDialogState({ ...dialogState, isFloatOpen: false}),
    openTransmitted: () => setDialogState({ ...dialogState, isTransmittedOpen: true}),
    closeTransmitted: () => setDialogState({ ...dialogState, isTransmittedOpen: false}),
    openCopies: () => setDialogState({ ...dialogState, isCopiesOpen: true}),
    closeCopies: () => setDialogState({ ...dialogState, isCopiesOpen: false}),
    openSent: () => setDialogState({ ...dialogState, isSentOpen: true}),
    closeSent: () => setDialogState({ ...dialogState, isSentOpen: false}),
  }

  return (
    <div className={pdfClass}>

      <h2 className={classes.title} align="center">
        SHOP DRAWING AND SUBMITTAL TRANSMITTAL
      </h2>

      <EditableBox
        openDialog={handleDialogState.openProject}
        showEdit={showEdit}>
        <Grid container spacing={2}>
          <Grid item xs={6} >
            <div>
              {submittal.projectName ? submittal.projectName : "[no project name]" }
            </div>
          </Grid>
          <Grid item xs={6}>
            <div align="right">
              {submittal.projectNumber ? submittal.projectNumber : "[no project number]" }
            </div>
          </Grid>
        </Grid>
      </EditableBox>
      <ProjectDialog
        isDialogOpen={dialogState.isProjectOpen}
        handleClose={handleDialogState.closeProject}
        fetchSubmittals={fetchSubmittal}
        values={{ ...submittal }} />

      <hr />

      <Grid container spacing={2}>
          <Grid item xs={7}>
            <label>
              Description:
            </label>
            <EditableBox
              openDialog={handleDialogState.openDescription}
              showEdit={showEdit}>
              <div>
                {submittal.description}
              </div>
            </EditableBox>
          </Grid>
        <DescriptionDialog
          isDialogOpen={dialogState.isDescriptionOpen}
          handleClose={handleDialogState.closeDescription}
          fetchSubmittals={fetchSubmittal}
          values={{ ...submittal }} />

        <Grid item xs={5}>
          <Grid container>
            <Grid item xs={8} align="right">
              <label className={classes.displayBlock}>
                Submittal No.:
              </label>
              <label className={classes.displayBlock}>
                Spec Section:
              </label>
            </Grid>
            <Grid item xs={4} align="right">
            <EditableBox
              openDialog={handleDialogState.openSubSpec}
              showEdit={showEdit}>
                <div>
                  {submittal.submittalNumber}
                </div>
                <div>
                  {submittal.specificationNumber}
                </div>
              </EditableBox>
              <SubSpecDialog
                isDialogOpen={dialogState.isSubSpecOpen}
                handleClose={handleDialogState.closeSubSpec}
                fetchSubmittals={fetchSubmittal}
                values={{ ...submittal }} />

            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <hr />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <label>
            Architect:
          </label>
          <EditableBox
              openDialog={handleDialogState.openArchitectAddress}
              showEdit={showEdit}>
            <FormattedAddress
              {...submittal?.architectAddress} />
          </EditableBox>
          <AddressDialog
            addressType="architectAddress"
            isDialogOpen={dialogState.isArchitectAddressOpen}
            handleClose={handleDialogState.closeArchitectAddress}
            fetchSubmittals={fetchSubmittal}
            values={{
              ...submittal.architectAddress,
              submittalId: submittal.id,
            }} />
        </Grid>
        <Grid item xs={6}>
          <label>
            Project:
          </label>
          <EditableBox
              openDialog={handleDialogState.openProjectAddress}
              showEdit={showEdit}>
            <FormattedAddress
              {...submittal?.projectAddress} />
          </EditableBox>
          <AddressDialog
            addressType="projectAddress"
            isDialogOpen={dialogState.isProjectAddressOpen}
            handleClose={handleDialogState.closeProjectAddress}
            fetchSubmittals={fetchSubmittal}
            values={{
              ...submittal.projectAddress,
              submittalId: submittal.id,
            }} />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <label>
            Contractor:
          </label>
          <EditableBox
              openDialog={handleDialogState.openContractorAddress}
              showEdit={showEdit}>
            <FormattedAddress
              {...submittal?.contractorAddress} />
          </EditableBox>
          <AddressDialog
            addressType="contractorAddress"
            isDialogOpen={dialogState.isContractorAddressOpen}
            handleClose={handleDialogState.closeContractorAddress}
            fetchSubmittals={fetchSubmittal}
            values={{
              ...submittal.contractorAddress,
              submittalId: submittal.id,
            }} />
        </Grid>
        <Grid item xs={6}>
          <label>
            Supplier:
          </label>
          <EditableBox
              openDialog={handleDialogState.openSupplier}
              showEdit={showEdit}>
            <div>
              {submittal.supplierName ? submittal.supplierName : "[no supplier data]"}
            </div>
          </EditableBox>
          <SupplierDialog
            isDialogOpen={dialogState.isSupplierOpen}
            handleClose={handleDialogState.closeSupplier}
            fetchSubmittals={fetchSubmittal}
            values={{ ...submittal }} />
          <hr />
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <label>
                Substitution:
              </label>
            </Grid>
            <EditableBox
              openDialog={handleDialogState.openSubstitution}
              showEdit={showEdit}>
              <Grid item xs={7} className={classes.noWrap}>
                {submittal.isSubstitutionUsed ? "✓ Yes" : "☐ Yes"}
              </Grid>
            </EditableBox>
            <SubstitutionDialog
              isDialogOpen={dialogState.isSubstitutionOpen}
              handleClose={handleDialogState.closeSubstitution}
              fetchSubmittals={fetchSubmittal}
              values={{ ...submittal }} />
          </Grid>
        </Grid>
      </Grid>

      <Box mt={1}>
        <EditableBox
          openDialog={handleDialogState.openReceivedInfo}
          showEdit={showEdit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <label>
                Date Received:
              </label>
              <span>
                {submittal.dateReceived}
              </span>
            </Grid>
            <Grid item xs={3}>
              <label>
                No. Received:
              </label>
              <span>
                {submittal.numberReceived}
              </span>
            </Grid>
            <Grid item xs={5}>
              <label>
                Date Returned:
              </label>
              <span>
                {submittal.responseDate}
              </span>
            </Grid>
          </Grid>
        </EditableBox>
        <ReceivedInfoDialog
          isDialogOpen={dialogState.isReceivedInfoOpen}
          handleClose={handleDialogState.closeReceivedInfo}
          fetchSubmittals={fetchSubmittal}
          values={{ ...submittal }} />
      </Box>

      <hr />

      <Box mb={1}>
        <label>
          Contractor Remarks:
        </label>
        <EditableBox
          openDialog={handleDialogState.openContractorRemarks}
          showEdit={showEdit}>
          <div className={classes.contractorRemarks}>
            {submittal?.contractorRemarks ?? '[no data]'}
          </div>
        </EditableBox>
        <ContractorRemarksDialog
          isDialogOpen={dialogState.isContractorRemarksOpen}
          handleClose={handleDialogState.closeContractorRemarks}
          fetchSubmittals={fetchSubmittal}
          values={{ ...submittal }} />
      </Box>

      <Grid container>
        <Grid item xs={4}>
          <div>
            Other Required Information:
          </div>
          <EditableBox
            openDialog={handleDialogState.openWarranty}
            showEdit={showEdit}>
            <Grid container spacing={2}>
              <Grid item xs={8} align="right">
                <div>
                  <label>
                    Warranty:
                  </label>
                </div>
                <div>
                  <label>
                    O&M Manuals:
                  </label>
                </div>
              </Grid>
              <Grid item xs={4}>
                  <div>
                    {submittal.hasWarranty ? "✓ Yes" : "☐ Yes"}
                  </div>
                  <div>
                    {submittal.hasManuals ? "✓ Yes" : "☐ Yes"}
                  </div>
              </Grid>
            </Grid>
          </EditableBox>
          <WarrantyDialog
            isDialogOpen={dialogState.isWarrantyOpen}
            handleClose={handleDialogState.closeWarranty}
            fetchSubmittals={fetchSubmittal}
            values={{ ...submittal }} />
        </Grid>
        <Grid item xs={8} className={smallClass}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div>
                <Grid container>
                  <Grid item xs={7} align="right">
                    <div>
                      Early Start Date:
                    </div>
                    <div>
                      Early Finish Date:
                    </div>
                    <div>
                      Late Finish Date:
                    </div>
                  </Grid>
                  <Grid item xs={1}>
                  </Grid>
                  <Grid item xs={4}>
                    <EditableBox
                      openDialog={handleDialogState.openTimeline}
                      showEdit={showEdit}>
                      <div className={classes.underlined}>
                        {submittal.earlyStartDate ? submittal.earlyStartDate : "[no data]"}
                      </div>
                      <div className={classes.underlined}>
                        {submittal.earlyFinishDate ? submittal.earlyFinishDate : "[no data]"}
                      </div>
                      <div className={classes.underlined}>
                        {submittal.lateFinishDate ? submittal.lateFinishDate : "[no data]"}
                      </div>
                    </EditableBox>
                    <TimelineDialog
                      isDialogOpen={dialogState.isTimelineOpen}
                      handleClose={handleDialogState.closeTimeline}
                      fetchSubmittals={fetchSubmittal}
                      values={{ ...submittal }} />
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <Grid container>
                  <Grid item xs={7} align="right">
                    <div>
                      Scheduled Float Time:
                    </div>
                    <div>
                      Submittal Task No:
                    </div>
                  </Grid>
                  <Grid item xs={1}>
                  </Grid>
                  <Grid item xs={4}>
                    <EditableBox
                      openDialog={handleDialogState.openFloat}
                      showEdit={showEdit}>
                      <div className={classes.underlined}>
                        {submittal.floatTime ? submittal.floatTime : "[no data]"}
                      </div>
                      <div className={classes.underlined}>
                        {submittal.submittalTaskNumber ? submittal.submittalTaskNumber : "[no data]"}
                      </div>
                    </EditableBox>
                    <FloatDialog
                      isDialogOpen={dialogState.isFloatOpen}
                      handleClose={handleDialogState.closeFloat}
                      fetchSubmittals={fetchSubmittal}
                      values={{ ...submittal }} />
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <hr />

      <label>
        Design Consultant's Review:
      </label>

      <Box p={1}>
        <EditableBox
          openDialog={handleDialogState.openTransmitted}
          showEdit={showEdit}>
          <Grid container>
            <Grid item xs={3}>
              TRANSMITTED TO:
            </Grid>
            <Grid item xs={4} className={classes.underlined}>
              {submittal.transmittedTo ? submittal.transmittedTo : "[no data]"}
            </Grid>
            <Grid item xs={3}>
                DATE RETURNED:
            </Grid>
            <Grid item xs={2} className={classes.underlined}>
              {submittal.responseDate ? submittal.responseDate : "[no data]"}
            </Grid>
          </Grid>
        </EditableBox>
        <TransmittedDialog
          isDialogOpen={dialogState.isTransmittedOpen}
          handleClose={handleDialogState.closeTransmitted}
          fetchSubmittals={fetchSubmittal}
          values={{ ...submittal }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={4}>
                <div>
                  DATE SENT:
                </div>
                <div>
                  NO. SENT:
                </div>
              </Grid>
              <Grid item xs={4}>
              <EditableBox
                openDialog={handleDialogState.openSent}
                showEdit={showEdit}>
                  <div className={classes.underlined}>
                    {submittal.responseDate ? submittal.responseDate : "[no data]"}
                  </div>
                  <div className={classes.underlined}>
                    {submittal.numberSent ? submittal.numberSent : "[no data]"}
                  </div>
                </EditableBox>
                <SentDialog
                  isDialogOpen={dialogState.isSentOpen}
                  handleClose={handleDialogState.closeSent}
                  fetchSubmittals={fetchSubmittal}
                  values={{ ...submittal }} />
              </Grid>
            </Grid>

            <label>
              ACTION:
            </label>

            <EditableBox
              openDialog={handleDialogState.openDcActions}
              showEdit={showEdit}>
              <div className={smallClass}>
                <div>
                  {submittal.isDcNoExceptionTaken ? "✓" : "☐"} NO EXCEPTION TAKEN RELATIVE TO DESIGN
                </div>
                <div>
                  {submittal.isDcNoExceptionTakenWithModificationNoted ? "✓" : "☐"} NO EXCEPTION TAKEN, MODIFICATION NOTED
                </div>
                <div>
                  {submittal.isDcAmmendAsNotedAndResubmit ? "✓" : "☐"} AMEND AS NOTED AND RESUBMIT
                </div>
                <div>
                  {submittal.isDcRejectedAndResubmit ? "✓" : "☐"} REJECTED AND RESUBMIT
                </div>
                <div>
                  {submittal.isDcSeeAttachedLetter ? "✓" : "☐"} SEE ATTACHED LETTER
                </div>
              </div>
            </EditableBox>
            <DcActionsDialog
              isDialogOpen={dialogState.isDcActionsOpen}
              handleClose={handleDialogState.closeDcActions}
              fetchSubmittals={fetchSubmittal}
              values={{ ...submittal }} />
          </Grid>
          <Grid item xs={6}>
            <Box mt={2}>
              <label>
                Consultant's Remarks:
              </label>
              <EditableBox
                openDialog={handleDialogState.openDcRemarks}
                showEdit={showEdit}>
                <div className={classes.dcRemarks}>
                  {submittal?.dcRemarks ?? '[no data]'}
                </div>
              </EditableBox>
              <DcRemarksDialog
                isDialogOpen={dialogState.isDcRemarksOpen}
                handleClose={handleDialogState.closeDcRemarks}
                fetchSubmittals={fetchSubmittal}
                values={{ ...submittal }} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <hr />

      <label>
        Architect's Review:
      </label>

      <Box p={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <label>
              ACTION:
            </label>

            <EditableBox
              openDialog={handleDialogState.openArchitectActions}
              showEdit={showEdit}>
              <div className={smallClass}>
                <div>
                  {submittal.isArchitectNoExceptionTaken ? "✓" : "☐"} NO EXCEPTION TAKEN RELATIVE TO DESIGN
                </div>
                <div>
                  {submittal.isArchitectNoExceptionTakenWithModificationNoted ? "✓" : "☐"} NO EXCEPTION TAKEN, MODIFICATION NOTED
                </div>
                <div>
                  {submittal.isArchitectAmmendAsNotedAndResubmit ? "✓" : "☐"} AMEND AS NOTED AND RESUBMIT
                </div>
                <div>
                  {submittal.isArchitectRejectedAndResubmit ? "✓" : "☐"} REJECTED AND RESUBMIT
                </div>
              </div>

              <Box mt={1} className={classes.bold}>
                Approved Substitution: {submittal.isArchitectApprovedSubmission ? "✓" : "☐"}
              </Box>
            </EditableBox>
            <ArchitectActionsDialog
              isDialogOpen={dialogState.isArchitectActionsOpen}
              handleClose={handleDialogState.closeArchitectActions}
              fetchSubmittals={fetchSubmittal}
              values={{ ...submittal }} />
          </Grid>
          <Grid item xs={6}>
            <label>
              Architect's Remarks:
            </label>
            <EditableBox
              openDialog={handleDialogState.openArchitectRemarks}
              showEdit={showEdit}>
              <div className={classes.architectRemarks}>
                {submittal?.architectRemarks ?? '[no data]'}
              </div>
            </EditableBox>
            <ArchitectRemarksDialog
              isDialogOpen={dialogState.isArchitectRemarksOpen}
              handleClose={handleDialogState.closeArchitectRemarks}
              fetchSubmittals={fetchSubmittal}
              values={{ ...submittal }} />
          </Grid>
        </Grid>
      </Box>

      <hr />

      <EditableBox
        openDialog={handleDialogState.openCopies}
        showEdit={showEdit}>
        <Grid container>
          <Grid item xs={6}>
            <label>
              Copies To:
            </label>
          </Grid>
          <Grid item xs={3} align="right">
            <label>
              Date Returned:
            </label>
          </Grid>
          <Grid item xs={2} className={classes.underlined}>
            {submittal.responseDate ? submittal.responseDate : "[no data]"}
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={2} align="right">
            Contractor:
          </Grid>
          <Grid item xs={1} align="center">
            {submittal.copiesForContractor}
          </Grid>
          <Grid item xs={1} align="right">
            Owner:
          </Grid>
          <Grid item xs={1} align="center">
            {submittal.copiesForOwner}
          </Grid>
          <Grid item xs={2} align="right">
            Inspector:
          </Grid>
          <Grid item xs={1} align="center">
            {submittal.copiesForInspector}
          </Grid>
          <Grid item xs={1} align="right">
            File:
          </Grid>
          <Grid item xs={1} align="center">
            {submittal.copiesForFile}
          </Grid>
          <Grid item xs={1} align="right">
            Other:
          </Grid>
          <Grid item xs={1} align="center">
            {submittal.copiesForOther}
          </Grid>
        </Grid>
      </EditableBox>
      <CopiesDialog
          isDialogOpen={dialogState.isCopiesOpen}
          handleClose={handleDialogState.closeCopies}
          fetchSubmittals={fetchSubmittal}
          values={{ ...submittal }} />
    </div>
  )
}

function FormattedAddress(props) {
  return (
  <div>
    <div>
      {props?.addressNameLine
        ? props.addressNameLine
        : '[missing address title]'}
    </div>
    <div>
      {props?.addressLine1
        ? props.addressLine1
        : '[missing address street]'}
    </div>
    <div>
      {(props?.city && props?.state)
        ? `${props.city}, ${props.state}`
        : '[missing data]'}
      {props?.zip
        ? ` ${props.zip}`
        : ''}
    </div>
  </div>
  )
}
