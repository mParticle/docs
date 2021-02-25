/* eslint-disable react/no-danger */
import React from 'react';

import '../src/styles/_colors.less';
import '../src/styles/_tabs.less';

export default {
    title: 'Markdown',
};

export const TabsModule = () => (
    <div className='tabs'>
        <input
            className='tab-toggle tab-toggle-1'
            id='tab-toggle-tab-1-0'
            type='radio'
            name='tab-toggle-1'
            checked='checked'
        />
        <label htmlFor='tab-toggle-tab-1-0' className='tab-toggle-label'>
            Tab 1
        </label>
        <div className='tab-content tab-toggle-1'>
            This is a test tab This has muliple content thingies
        </div>

        <input
            className='tab-toggle tab-toggle-2'
            id='tab-toggle-tab-2-1'
            type='radio'
            name='tab-toggle-1'
        />
        <label htmlFor='tab-toggle-tab-2-1' className='tab-toggle-label'>
            Tab 2
        </label>
        <div className='tab-content tab-toggle-2'>
            This is a second tab That has more stuff ### Like a header and some
            code ```javascript console.log('test markup'); ```
        </div>

        <input
            className='tab-toggle tab-toggle-3'
            id='tab-toggle-tab-3-2'
            type='radio'
            name='tab-toggle-1'
        />
        <label htmlFor='tab-toggle-tab-3-2' className='tab-toggle-label'>
            Tab 3
        </label>
        <div className='tab-content tab-toggle-3'>This is the third tab</div>
        <style
            dangerouslySetInnerHTML={{
                __html: `
      .tabs input.tab-toggle-1:checked ~ .tab-content.tab-toggle-1 {
        display:block;
      }
      .tabs input.tab-toggle-2:checked ~ .tab-content.tab-toggle-2 {
        display:block;
      }
      .tabs input.tab-toggle-3:checked ~ .tab-content.tab-toggle-3 {
        display:block;
      }
    `,
            }}
        />
    </div>
);
