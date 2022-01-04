import sequenceSchema from "./sequence.schema";

export const getSequenceValue = async (sequenceName: string) => {
    checkEntry(sequenceName);
    const update: any = { $inc: { sequence_value: 1 } }
    const data: any = await sequenceSchema.findOneAndUpdate({ uid: sequenceName }, update, { new: true })
    if (!data) {
        return 1
    }
    return data.sequence_value;
}

const checkEntry = async (sequenceName: string) => {
    try {
        const res = await sequenceSchema.findOne({ uid: sequenceName });
        if (!res) {
            await sequenceSchema.create({ uid: sequenceName });
        }
    } catch (error: any) {
        console.log({
            errorCode: error.code,
            error: error.message
        });
    }
}