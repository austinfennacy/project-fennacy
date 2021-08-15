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
import ReceivedInfoDialog from './edit/receivedInfoDialog'
import ContractorRemarksDialog from './edit/contractorRemarksDialog'
import ArchitectRemarksDialog from './edit/architectRemarksDialog'
import DcRemarksDialog from './edit/dcRemarksDialog'
import TimelineDialog from './edit/timelineDialog'
import FloatDialog from './edit/floatDialog'
import TransmittedDialog from './edit/transmittedDialog'
import SentDialog from './edit/sentDialog'

const useStyles = makeStyles((theme) => ({
  pdfScreen: {
    fontFamily: "TimesNewRoman",
    padding: "4vw",
    fontSize: "1.1vw",
  },
  pdfPrint: {
    fontFamily: "TimesNewRoman",
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
  const classes = useStyles()
  const pdfClass = useMediaQuery("screen")
    ? classes.pdfScreen
    : classes.pdfPrint
  const smallClass = useMediaQuery("screen")
    ? classes.smallScreen
    : classes.smallPrint
  
  const [submittal, setSubmittal] = useState({})
  useEffect(() => fetchSubmittal(), [id])
  const fetchSubmittal = () => fetch(`/submittal/${id}`)
    .then(res => res.json())
    .then((submittalJson) => setSubmittal(submittalJson))

  const [openUpdateProjectDialog, setOpenUpdateProjectDialog] = useState(false)
  const handleOpenUpdateProjectDialog = () => { setOpenUpdateProjectDialog(true) }
  const handleCloseUpdateProjectDialog = () => { setOpenUpdateProjectDialog(false) }

  const [openUpdateDescriptionDialog, setOpenUpdateDescriptionDialog] = useState(false)
  const handleOpenUpdateDescriptionDialog = () => { setOpenUpdateDescriptionDialog(true) }
  const handleCloseUpdateDescriptionDialog = () => { setOpenUpdateDescriptionDialog(false) }

  const [openUpdateSubSpecDialog, setOpenUpdateSubSpecDialog] = useState(false)
  const handleOpenUpdateSubSpecDialog = () => { setOpenUpdateSubSpecDialog(true) }
  const handleCloseUpdateSubSpecDialog = () => { setOpenUpdateSubSpecDialog(false) }

  const [openUpdateArchitectAddressDialog, setOpenUpdateArchitectAddressDialog] = useState(false)
  const handleOpenUpdateArchitectAddressDialog = () => { setOpenUpdateArchitectAddressDialog(true) }
  const handleCloseUpdateArchitectAddressDialog = () => { setOpenUpdateArchitectAddressDialog(false) }

  const [openUpdateProjectAddressDialog, setOpenUpdateProjectAddressDialog] = useState(false)
  const handleOpenUpdateProjectAddressDialog = () => { setOpenUpdateProjectAddressDialog(true) }
  const handleCloseUpdateProjectAddressDialog = () => { setOpenUpdateProjectAddressDialog(false) }

  const [openUpdateContractorAddressDialog, setOpenUpdateContractorAddressDialog] = useState(false)
  const handleOpenUpdateContractorAddressDialog = () => { setOpenUpdateContractorAddressDialog(true) }
  const handleCloseUpdateContractorAddressDialog = () => { setOpenUpdateContractorAddressDialog(false) }

  const [openUpdateSupplierDialog, setOpenUpdateSupplierDialog] = useState(false)
  const handleOpenUpdateSupplierDialog = () => { setOpenUpdateSupplierDialog(true) }
  const handleCloseUpdateSupplierDialog = () => { setOpenUpdateSupplierDialog(false) }

  const [openUpdateSubstitutionDialog, setOpenUpdateSubstitutionDialog] = useState(false)
  const handleOpenUpdateSubstitutionDialog = () => { setOpenUpdateSubstitutionDialog(true) }
  const handleCloseUpdateSubstitutionDialog = () => { setOpenUpdateSubstitutionDialog(false) }

  const [openUpdateWarrantyDialog, setOpenUpdateWarrantyDialog] = useState(false)
  const handleOpenUpdateWarrantyDialog = () => { setOpenUpdateWarrantyDialog(true) }
  const handleCloseUpdateWarrantyDialog = () => { setOpenUpdateWarrantyDialog(false) }

  const [openUpdateDcActionsDialog, setOpenUpdateDcActionsDialog] = useState(false)
  const handleOpenUpdateDcActionsDialog = () => { setOpenUpdateDcActionsDialog(true) }
  const handleCloseUpdateDcActionsDialog = () => { setOpenUpdateDcActionsDialog(false) }

  const [openUpdateReceivedInfoDialog, setOpenUpdateReceivedInfoDialog] = useState(false)
  const handleOpenUpdateReceivedInfoDialog = () => { setOpenUpdateReceivedInfoDialog(true) }
  const handleCloseUpdateReceivedInfoDialog = () => { setOpenUpdateReceivedInfoDialog(false) }

  const [openUpdateContractorRemarksDialog, setOpenUpdateContractorRemarksDialog] = useState(false)
  const handleOpenUpdateContractorRemarksDialog = () => { setOpenUpdateContractorRemarksDialog(true) }
  const handleCloseUpdateContractorRemarksDialog = () => { setOpenUpdateContractorRemarksDialog(false) }

  const [openUpdateDcRemarksDialog, setOpenUpdateDcRemarksDialog] = useState(false)
  const handleOpenUpdateDcRemarksDialog = () => { setOpenUpdateDcRemarksDialog(true) }
  const handleCloseUpdateDcRemarksDialog = () => { setOpenUpdateDcRemarksDialog(false) }

  const [openUpdateArchitectRemarksDialog, setOpenUpdateArchitectRemarksDialog] = useState(false)
  const handleOpenUpdateArchitectRemarksDialog = () => { setOpenUpdateArchitectRemarksDialog(true) }
  const handleCloseUpdateArchitectRemarksDialog = () => { setOpenUpdateArchitectRemarksDialog(false) }

  const [openUpdateTimelineDialog, setOpenUpdateTimelineDialog] = useState(false)
  const handleOpenUpdateTimelineDialog = () => { setOpenUpdateTimelineDialog(true) }
  const handleCloseUpdateTimelineDialog = () => { setOpenUpdateTimelineDialog(false) }

  const [openUpdateFloatDialog, setOpenUpdateFloatDialog] = useState(false)
  const handleOpenUpdateFloatDialog = () => { setOpenUpdateFloatDialog(true) }
  const handleCloseUpdateFloatDialog = () => { setOpenUpdateFloatDialog(false) }

  const [openUpdateTransmittedDialog, setOpenUpdateTransmittedDialog] = useState(false)
  const handleOpenUpdateTransmittedDialog = () => { setOpenUpdateTransmittedDialog(true) }
  const handleCloseUpdateTransmittedDialog = () => { setOpenUpdateTransmittedDialog(false) }

  const [openUpdateSentDialog, setOpenUpdateSentDialog] = useState(false)
  const handleOpenUpdateSentDialog = () => { setOpenUpdateSentDialog(true) }
  const handleCloseUpdateSentDialog = () => { setOpenUpdateSentDialog(false) }

  return (
    <div className={pdfClass}>
      
      <h2 className={classes.title} align="center">
        SHOP DRAWING AND SUBMITTAL TRANSMITTAL
      </h2>

      <EditableBox  
        openDialog={handleOpenUpdateProjectDialog}
        showEdit={props.showEdit}>
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
        isDialogOpen={openUpdateProjectDialog}
        handleClose={handleCloseUpdateProjectDialog}
        fetchSubmittals={fetchSubmittal}
        values={{ ...submittal }} />

      <hr />

      <Grid container spacing={2}>
          <Grid item xs={7}>
            <label>
              Description:
            </label>
            <EditableBox  
              openDialog={handleOpenUpdateDescriptionDialog}
              showEdit={props.showEdit}>
              <div>
                {submittal.description}
              </div>
            </EditableBox>
          </Grid>
        <DescriptionDialog
          isDialogOpen={openUpdateDescriptionDialog}
          handleClose={handleCloseUpdateDescriptionDialog}
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
              openDialog={handleOpenUpdateSubSpecDialog}
              showEdit={props.showEdit}>
                <div>
                  {submittal.submittalNumber}
                </div>
                <div>
                  {submittal.specificationNumber}
                </div>
              </EditableBox>
              <SubSpecDialog
                isDialogOpen={openUpdateSubSpecDialog}
                handleClose={handleCloseUpdateSubSpecDialog}
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
              openDialog={handleOpenUpdateArchitectAddressDialog}
              showEdit={props.showEdit}>
            <FormattedAddress
              {...submittal?.architectAddress} />
          </EditableBox>
          <AddressDialog
            addressType="architectAddress"
            isDialogOpen={openUpdateArchitectAddressDialog}
            handleClose={handleCloseUpdateArchitectAddressDialog}
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
              openDialog={handleOpenUpdateProjectAddressDialog}
              showEdit={props.showEdit}>
            <FormattedAddress
              {...submittal?.projectAddress} />
          </EditableBox>
          <AddressDialog
            addressType="projectAddress"
            isDialogOpen={openUpdateProjectAddressDialog}
            handleClose={handleCloseUpdateProjectAddressDialog}
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
              openDialog={handleOpenUpdateContractorAddressDialog}
              showEdit={props.showEdit}>
            <FormattedAddress
              {...submittal?.contractorAddress} />
          </EditableBox>
          <AddressDialog
            addressType="contractorAddress"
            isDialogOpen={openUpdateContractorAddressDialog}
            handleClose={handleCloseUpdateContractorAddressDialog}
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
              openDialog={handleOpenUpdateSupplierDialog}
              showEdit={props.showEdit}>
            <div>
              {submittal.supplierName ? submittal.supplierName : "[no supplier data]"}
            </div>
          </EditableBox>
          <SupplierDialog
            isDialogOpen={openUpdateSupplierDialog}
            handleClose={handleCloseUpdateSupplierDialog}
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
              openDialog={handleOpenUpdateSubstitutionDialog}
              showEdit={props.showEdit}>
              <Grid item xs={7} className={classes.noWrap}>
                {submittal.isSubstitutionUsed ? "🗹 Yes" : "☐ Yes"}
              </Grid>
            </EditableBox>
            <SubstitutionDialog
              isDialogOpen={openUpdateSubstitutionDialog}
              handleClose={handleCloseUpdateSubstitutionDialog}
              fetchSubmittals={fetchSubmittal}
              values={{ ...submittal }} />
          </Grid>
        </Grid>
      </Grid>

      <EditableBox  
        openDialog={handleOpenUpdateReceivedInfoDialog}
        showEdit={props.showEdit}>
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
        isDialogOpen={openUpdateReceivedInfoDialog}
        handleClose={handleCloseUpdateReceivedInfoDialog}
        fetchSubmittals={fetchSubmittal}
        values={{ ...submittal }} />

      <hr />

      <Box mb={1}>
        <label>
          Contractor Remarks:
        </label>
        <EditableBox  
          openDialog={handleOpenUpdateContractorRemarksDialog}
          showEdit={props.showEdit}>
          <div className={classes.contractorRemarks}>
            {submittal?.contractorRemarks ?? '[no data]'}
          </div>
        </EditableBox>
        <ContractorRemarksDialog
          isDialogOpen={openUpdateContractorRemarksDialog}
          handleClose={handleCloseUpdateContractorRemarksDialog}
          fetchSubmittals={fetchSubmittal}
          values={{ ...submittal }} />
      </Box>

      <Grid container>
        <Grid item xs={4}>
          <div>
            Other Required Information:
          </div>
          <EditableBox  
            openDialog={handleOpenUpdateWarrantyDialog}
            showEdit={props.showEdit}>
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
                    {submittal.hasWarranty ? "🗹 Yes" : "☐ Yes"}
                  </div>
                  <div>
                    {submittal.hasManuals ? "🗹 Yes" : "☐ Yes"}
                  </div>
              </Grid>
            </Grid>
          </EditableBox>
          <WarrantyDialog
            isDialogOpen={openUpdateWarrantyDialog}
            handleClose={handleCloseUpdateWarrantyDialog}
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
                      openDialog={handleOpenUpdateTimelineDialog}
                      showEdit={props.showEdit}>
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
                      isDialogOpen={openUpdateTimelineDialog}
                      handleClose={handleCloseUpdateTimelineDialog}
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
                      openDialog={handleOpenUpdateFloatDialog}
                      showEdit={props.showEdit}>
                      <div className={classes.underlined}>
                        {submittal.floatTime ? submittal.floatTime : "[no data]"}
                      </div>
                      <div className={classes.underlined}>
                        {submittal.submittalTaskNumber ? submittal.submittalTaskNumber : "[no data]"}
                      </div>
                    </EditableBox>
                    <FloatDialog
                      isDialogOpen={openUpdateFloatDialog}
                      handleClose={handleCloseUpdateFloatDialog}
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
          openDialog={handleOpenUpdateTransmittedDialog}
          showEdit={props.showEdit}>
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
          isDialogOpen={openUpdateTransmittedDialog}
          handleClose={handleCloseUpdateTransmittedDialog}
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
                openDialog={handleOpenUpdateSentDialog}
                showEdit={props.showEdit}>
                  <div className={classes.underlined}>
                    {submittal.responseDate ? submittal.responseDate : "[no data]"}
                  </div>
                  <div className={classes.underlined}>
                    {submittal.numberSent ? submittal.numberSent : "[no data]"}
                  </div>
                </EditableBox>
                <SentDialog
                  isDialogOpen={openUpdateSentDialog}
                  handleClose={handleCloseUpdateSentDialog}
                  fetchSubmittals={fetchSubmittal}
                  values={{ ...submittal }} />
              </Grid>
            </Grid>
            
            <label>
              ACTION:
            </label>

            <EditableBox  
              openDialog={handleOpenUpdateDcActionsDialog}
              showEdit={props.showEdit}>
              <div className={smallClass}>
                <div>
                  {submittal.isDcNoExceptionTaken ? "🗹" : "☐"} NO EXCEPTION TAKEN RELATIVE TO DESIGN
                </div>
                <div>
                  {submittal.isDcNoExceptionTakenWithModificationNoted ? "🗹" : "☐"} NO EXCEPTION TAKEN, MODIFICATION NOTED
                </div>
                <div>
                  {submittal.isDcAmmendAsNotedAndResubmit ? "🗹" : "☐"} AMEND AS NOTED AND RESUBMIT
                </div>
                <div>
                  {submittal.isDcRejectedAndResubmit ? "🗹" : "☐"} REJECTED AND RESUBMIT
                </div>
                <div>
                  {submittal.isDcSeeAttachedLetter ? "🗹" : "☐"} SEE ATTACHED LETTER
                </div>
              </div>
            </EditableBox>
            <DcActionsDialog
              isDialogOpen={openUpdateDcActionsDialog}
              handleClose={handleCloseUpdateDcActionsDialog}
              fetchSubmittals={fetchSubmittal}
              values={{ ...submittal }} />
          </Grid>
          <Grid item xs={6}>
            <Box mt={2}>
              <label>
                Consultant's Remarks:
              </label>
              <EditableBox  
                openDialog={handleOpenUpdateDcRemarksDialog}
                showEdit={props.showEdit}>
                <div className={classes.dcRemarks}>
                  {submittal?.dcRemarks ?? '[no data]'}
                </div>
              </EditableBox>
              <DcRemarksDialog
                isDialogOpen={openUpdateDcRemarksDialog}
                handleClose={handleCloseUpdateDcRemarksDialog}
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
        <Grid container>
          <Grid item xs={6}>
            <label>
              ACTION:
            </label>

            <div className={smallClass}>
              <div>
                {submittal.isArchitectNoExceptionTaken ? "🗹" : "☐"} NO EXCEPTION TAKEN RELATIVE TO DESIGN
              </div>
              <div>
                {submittal.isArchitectNoExceptionTakenWithModificationNoted ? "🗹" : "☐"} NO EXCEPTION TAKEN, MODIFICATION NOTED
              </div>
              <div>
                {submittal.isArchitectAmmendAsNotedAndResubmit ? "🗹" : "☐"} AMEND AS NOTED AND RESUBMIT
              </div>
              <div>
                {submittal.isArchitectRejectedAndResubmit ? "🗹" : "☐"} REJECTED AND RESUBMIT
              </div>
            </div>

            <Box mt={1} className={classes.bold}>
              Approved Substitution: {submittal.isArchitectApprovedSubmission ? "🗹" : "☐"}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <label>
              Architect's Remarks:
            </label>
            <EditableBox  
              openDialog={handleOpenUpdateArchitectRemarksDialog}
              showEdit={props.showEdit}>
              <div className={classes.architectRemarks}>
                {submittal?.architectRemarks ?? '[no data]'}
              </div>
            </EditableBox>
            <ArchitectRemarksDialog
              isDialogOpen={openUpdateArchitectRemarksDialog}
              handleClose={handleCloseUpdateArchitectRemarksDialog}
              fetchSubmittals={fetchSubmittal}
              values={{ ...submittal }} />
          </Grid>
        </Grid>
      </Box>

      <hr />

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
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={1} align="right">
          Contractor:
        </Grid>
        <Grid item xs={1}>
          {submittal.copiesForContractor}
        </Grid>
        <Grid item xs={1} align="right">
          Owner:
        </Grid>
        <Grid item xs={1}>
          {submittal.copiesForOwner}
        </Grid>
        <Grid item xs={1} align="right">
          Inspector:
        </Grid>
        <Grid item xs={1}>
          {submittal.copiesForInspector}
        </Grid>
        <Grid item xs={1} align="right">
          File:
        </Grid>
        <Grid item xs={1}>
          {submittal.copiesForFile}
        </Grid>
        <Grid item xs={1} align="right">
          Other:
        </Grid>
        <Grid item xs={1}>
          {submittal.copiesForOther}
        </Grid>
      </Grid>
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