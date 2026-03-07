# SignVaarta - Scaling Guide

## Current Capacity

### Frontend (Amplify + CloudFront)
- **Capacity**: Unlimited (CloudFront CDN)
- **Status**: ✅ Production ready
- **No action needed**

### Backend APIs

#### ISL to Speech API (`api.signvaarta.com`)
- **Endpoints**: `/predict`, `/format`, `/speak`
- **Current capacity**: Depends on backend infrastructure
- **Recommended**: Check with backend team

#### Speech to Text API (`execute-api.ap-south-1.amazonaws.com`)
- **Endpoints**: `/upload-url`, `/start`
- **Current capacity**: API Gateway default limits
- **Recommended**: Monitor and adjust throttling

## Traffic Estimates

### Hackathon/Demo (Current)
- **Expected users**: 50-200 concurrent
- **Status**: ✅ Ready
- **No changes needed**

### Production Launch
- **Expected users**: 500-2,000 concurrent
- **Status**: ⚠️ Needs optimization
- **Actions required**: See below

## Scaling Checklist

### Phase 1: Monitoring (Do Now)

- [ ] Set up CloudWatch Dashboard
- [ ] Create alarms for API errors
- [ ] Monitor Lambda concurrency
- [ ] Track API Gateway throttling
- [ ] Monitor S3 request metrics

### Phase 2: Optimization (Before Launch)

- [ ] Enable API Gateway caching (TTL: 300s)
- [ ] Increase Lambda reserved concurrency
- [ ] Add CloudFront caching headers
- [ ] Optimize image sizes (if needed)
- [ ] Add rate limiting per IP

### Phase 3: High Scale (If Needed)

- [ ] Move model to SageMaker (auto-scaling)
- [ ] Add Redis caching layer
- [ ] Implement request queuing
- [ ] Add CDN for API responses
- [ ] Multi-region deployment

## API Gateway Configuration

### Current Limits (Default)
```
Throttle rate: 10,000 requests/second
Burst limit: 5,000 requests
```

### Recommended for Production
```
Throttle rate: 20,000 requests/second
Burst limit: 10,000 requests
Enable caching: 300 seconds TTL
```

### How to Update
1. Go to API Gateway Console
2. Select your API
3. Go to Stages → Settings
4. Update throttling limits
5. Enable caching

## Lambda Configuration

### Current (Default)
```
Concurrent executions: 1,000 (account limit)
Memory: Check your functions
Timeout: Check your functions
```

### Recommended
```
Reserved concurrency: 100 per function
Memory: 1024 MB (for ML inference)
Timeout: 30 seconds (for API calls)
```

### How to Update
1. Go to Lambda Console
2. Select your function
3. Configuration → Concurrency
4. Set reserved concurrency

## CloudWatch Alarms

### Critical Alarms to Set Up

1. **API Gateway 5XX Errors**
   ```
   Metric: 5XXError
   Threshold: > 10 in 5 minutes
   Action: SNS notification
   ```

2. **Lambda Throttling**
   ```
   Metric: Throttles
   Threshold: > 5 in 5 minutes
   Action: SNS notification
   ```

3. **High Latency**
   ```
   Metric: Latency
   Threshold: > 3000ms
   Action: SNS notification
   ```

4. **Lambda Errors**
   ```
   Metric: Errors
   Threshold: > 10 in 5 minutes
   Action: SNS notification
   ```

## Cost Optimization

### Current Estimated Costs

**Low Traffic (100 users/day)**
- Amplify: $5/month
- API Gateway: $3/month
- Lambda: $5/month
- S3: $2/month
- **Total**: ~$15/month

**Medium Traffic (1,000 users/day)**
- Amplify: $10/month
- API Gateway: $15/month
- Lambda: $25/month
- S3: $5/month
- **Total**: ~$55/month

**High Traffic (10,000 users/day)**
- Amplify: $30/month
- API Gateway: $100/month
- Lambda: $200/month
- S3: $20/month
- **Total**: ~$350/month

## Performance Optimization

### Frontend
- ✅ CloudFront CDN enabled
- ✅ Gzip compression enabled
- ✅ HTTP/2 enabled
- ✅ Images optimized

### Backend
- [ ] Enable API Gateway caching
- [ ] Add Redis for session data
- [ ] Optimize Lambda cold starts
- [ ] Use Lambda layers for dependencies

## Load Testing

### Before Production Launch

Test with tools like:
- Apache JMeter
- AWS Load Testing
- Locust

### Test Scenarios
1. **Baseline**: 100 concurrent users
2. **Peak**: 500 concurrent users
3. **Stress**: 1,000 concurrent users

### Success Criteria
- Response time < 2 seconds (p95)
- Error rate < 1%
- No throttling errors

## Monitoring Dashboard

### Key Metrics to Track

1. **Frontend**
   - Page load time
   - CloudFront cache hit ratio
   - Bandwidth usage

2. **Backend**
   - API response time
   - Error rate (4XX, 5XX)
   - Lambda duration
   - Lambda concurrent executions

3. **Business**
   - Active users
   - Feature usage (ISL, STT)
   - Conversion rate

## Emergency Response

### If Site Goes Down

1. Check CloudWatch Logs
2. Check API Gateway metrics
3. Check Lambda errors
4. Increase Lambda concurrency
5. Enable API Gateway caching
6. Contact AWS Support (if needed)

### Rollback Plan

```bash
# Revert to previous version
git revert HEAD
git push origin main

# Amplify will auto-deploy previous version
```

## Support Contacts

- **AWS Support**: [AWS Console](https://console.aws.amazon.com/support/)
- **Amplify Docs**: https://docs.amplify.aws
- **API Gateway Docs**: https://docs.aws.amazon.com/apigateway/

---

**Status**: Ready for hackathon/demo traffic ✅
**Next Steps**: Set up monitoring before production launch
**Last Updated**: 2024
