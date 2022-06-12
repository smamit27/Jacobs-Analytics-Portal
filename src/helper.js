import { bp } from './theme';
import { orderBy, sortBy,filter } from 'lodash'
export const respCss = (rule, values) => {
  let styles = '';

  if (!values) {
    return;
  }

  Object.keys(values).forEach((key) => {
    styles += `
      @media ${bp[key]} {
         ${rule}: ${values[key]}; 
       }
     `;
  });

  return styles;
};

export const viewingOrder = () => ({})

viewingOrder.AZ = (arr) => {
  const allReports = orderBy(arr, 'title', 'asc')

  return allReports.map(section => ({
    ...section,
    reportList: orderBy(section.reportList, 'ReportName', 'asc')
  }))
}

viewingOrder.ZA = (arr) => {
  const allReports = orderBy(arr, 'title', 'desc')
  return allReports.map(section => ({
    ...section,
    reportList: orderBy(section.reportList, 'ReportName', 'desc')
  }))
}

viewingOrder.NEW = (arr) => {
  return arr.map(section => ({
    ...section,
    reportList: sortBy(section.reportList, (report) => new Date(report.ModifiedDate))
  }))
}

viewingOrder.OLD = (arr) => {
  return arr.map(section => ({
    ...section,
    reportList: sortBy(section.reportList, (report) => new Date(report.ModifiedDate)).reverse()
  }))
}
export const viewingItem = () => ({})
viewingItem.ALL = (arr) => {
  return arr.map(section => ({
    ...section,
    reportList: filter(section.reportList,(report)=> report)
  }))
}

viewingItem.AVAILABLE = (arr) => {
  const availableList = arr.map(section => ({
    ...section,
    reportList: filter(section.reportList,(report)=> report.AccessFlg === 'Y')
  }))
  return filter(availableList,(report) =>report.reportList.length > 0);
}

viewingItem.LOCKED = (arr) => {
  const lockedList = arr.map(section => ({
    ...section,
    reportList: filter(section.reportList,(report)=> report.AccessFlg === 'N' )
  }))
  return filter(lockedList,(report) =>report.reportList.length > 0);
}


export const toggleFavouriteHelper = (reportList, updatedData) => {
  const oldData = reportList

  const selectedSection = oldData.find(sec => sec.id === updatedData.CategoryId)

  const selectedSectionIndex = oldData.findIndex(sec => sec.id === updatedData.CategoryId)

  const selectedReport = selectedSection.reportList.find(rep => rep.ReportId === updatedData.ReportId)

  const selectedReportIndex = selectedSection.reportList.findIndex(rep => rep.ReportId === updatedData.ReportId)

  selectedReport.IsFavFlg = selectedReport.IsFavFlg === 'N' ? 'Y' : 'N'

  selectedSection.reportList.splice(selectedReportIndex, 1, selectedReport)

  oldData.splice(selectedSectionIndex, 1, selectedSection)

  return oldData
}