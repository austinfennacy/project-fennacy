import './submittalPdf.css'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { useMediaQuery } from '@material-ui/core'
import EditableBox from './edit/editableBox'
import ProjectDialog from './edit/projectDialog'
import DescriptionDialog from './edit/descriptionDialog'
import SubSpecDialog from './edit/subSpecDialog'
import AddressDialog from './edit/addressDialog'
import SupplierDialog from './edit/supplierDialog'
import SubstitutionDialog from './edit/substitutionDialog'
import WarrantyDialog from './edit/warrantyDialog'
import ReceivedInfoDialog from './edit/receivedInfoDialog'
import ContractorRemarksDialog from './edit/contractorRemarksDialog'
import TimelineDialog from './edit/timelineDialog'
import FloatDialog from './edit/floatDialog'

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

  const [openUpdateReceivedInfoDialog, setOpenUpdateReceivedInfoDialog] = useState(false)
  const handleOpenUpdateReceivedInfoDialog = () => { setOpenUpdateReceivedInfoDialog(true) }
  const handleCloseUpdateReceivedInfoDialog = () => { setOpenUpdateReceivedInfoDialog(false) }

  const [openUpdateContractorRemarksDialog, setOpenUpdateContractorRemarksDialog] = useState(false)
  const handleOpenUpdateContractorRemarksDialog = () => { setOpenUpdateContractorRemarksDialog(true) }
  const handleCloseUpdateContractorRemarksDialog = () => { setOpenUpdateContractorRemarksDialog(false) }

  const [openUpdateTimelineDialog, setOpenUpdateTimelineDialog] = useState(false)
  const handleOpenUpdateTimelineDialog = () => { setOpenUpdateTimelineDialog(true) }
  const handleCloseUpdateTimelineDialog = () => { setOpenUpdateTimelineDialog(false) }

  const [openUpdateFloatDialog, setOpenUpdateFloatDialog] = useState(false)
  const handleOpenUpdateFloatDialog = () => { setOpenUpdateFloatDialog(true) }
  const handleCloseUpdateFloatDialog = () => { setOpenUpdateFloatDialog(false) }

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
            <Grid item xs={7}>
              <EditableBox  
                openDialog={handleOpenUpdateSubstitutionDialog}
                showEdit={props.showEdit}>
                <span>
                  {submittal.isSubstitutionUsed ? "🗹 Yes" : "☐ Yes"}
                </span>
              </EditableBox>
              <SubstitutionDialog
                isDialogOpen={openUpdateSubstitutionDialog}
                handleClose={handleCloseUpdateSubstitutionDialog}
                fetchSubmittals={fetchSubmittal}
                values={{ ...submittal }} />
            </Grid>
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

      <div>
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
      </div>

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

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
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