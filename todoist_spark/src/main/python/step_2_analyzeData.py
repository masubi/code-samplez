%python
rmse = evaluator.evaluate(predictions)
print "RMSE on our test set: %g" % rmse

predictions = pipelineModel.transform(test)
display(predictions.select("duration", "prediction", *featuresCols).orderBy("close_priority"))