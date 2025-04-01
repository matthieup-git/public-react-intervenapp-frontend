import React from 'react'

import { Switch } from "../../src/components/components/ui/switch"

import { useDispatch } from 'react-redux';
import { updateStatusIsDoneToStore } from "../../reducers/report"
import { deleteReportToStore } from '../../reducers/report';

import { useRouter } from 'next/router';

function SwitchStatus({ isDone, setIsDone, token }) {

  const dispatch = useDispatch();
  const router = useRouter();


  const handleChange = async () => {
    const newIsDone = !isDone;
    setIsDone(newIsDone)
    await handleUpdateStatusReport(newIsDone)
  };

  const handleUpdateStatusReport = async (newIsDone) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/reports/updateReportStatus/${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isDone: newIsDone
        }),
      })
      console.log("response", response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedReport = await response.json()

      if (updatedReport.result) {
        await updateStatusInStore(newIsDone)
      } else {
        dispatch(deleteReportToStore());
        router.push('/tous-les-rapports');
        alert("Erreur de mise à jour");
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  const updateStatusInStore = async (newIsDone) => {
    dispatch(updateStatusIsDoneToStore(newIsDone))
  }

  return (
    <Switch
      checked={isDone}
      onCheckedChange={handleChange}
    />
  )
}

export default SwitchStatus