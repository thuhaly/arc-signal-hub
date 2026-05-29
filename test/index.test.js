import test from 'node:test';import assert from 'node:assert/strict';import {classifyTransfer,formatUsdc} from '../src/index.js';
test('classifies swap and whale thresholds',()=>{assert.equal(classifyTransfer({amount:500_000000n,toContract:true}),'swap-alert');assert.equal(classifyTransfer({amount:100000_000000n,toContract:false}),'whale-transfer');assert.equal(classifyTransfer({amount:499_000000n,toContract:true}),'ignore');});
test('formats 6-decimal USDC',()=>{assert.equal(formatUsdc(1234567n),'1.234567 USDC');});
