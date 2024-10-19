
import styled from '@emotion/styled';
import React from 'react';
import {Typography} from "@mui/material";



const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }
`;

const StyledLogo = styled.div<{ rtl?: boolean }>`
  width: 35px;
  min-width: 35px;
  height: 35px;
  min-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: white;
  font-size: 24px;background: rgb(105,86,229);
    background: linear-gradient(0deg, rgba(105,86,229,1) 70%, rgba(116,98,228,1) 100%);
`;

export const SidebarHeader = () => {
    return (
        <StyledSidebarHeader style={{ marginBottom: '24px', marginTop: '16px' }}  >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <StyledLogo className={'mr-3'}>T</StyledLogo>
                <Typography variant="subtitle1" fontWeight={700} color="#6956E5">Teamify</Typography>
            </div>
        </StyledSidebarHeader>
    );
};
